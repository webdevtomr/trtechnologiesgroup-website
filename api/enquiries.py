"""Production website enquiries. Deliver to the firm; never store personal data in static files."""
from email.message import EmailMessage
from email.utils import make_msgid
from http.server import BaseHTTPRequestHandler
from urllib.request import Request, urlopen
import hashlib
import json
import os
import re
import smtplib
import ssl
import threading
import time

RECIPIENT = 'info@trtechnologiesgroup.com'
_requests = {}
_lock = threading.Lock()


def validate(data):
    if not isinstance(data, dict):
        raise ValueError('Please complete the enquiry form.')
    fields = {}
    for key, limit in [('name', 120), ('email', 254), ('organisation', 160), ('message', 6000), ('website', 200)]:
        value = data.get(key, '')
        if not isinstance(value, str) or len(value) > limit:
            raise ValueError('Please check the length of your ' + key + '.')
        fields[key] = value.strip()
    if not fields['name'] or len(fields['message']) < 10:
        raise ValueError('Please add your name and at least 10 characters about your project.')
    if not re.fullmatch(r'[^\s@\r\n]+@[^\s@\r\n]+\.[^\s@\r\n]+', fields['email']):
        raise ValueError('Please enter a valid email address.')
    if fields['website']:
        raise ValueError('Please leave the extra website field empty.')
    return fields


def send_enquiry(fields):
    sender = os.environ.get('TR_MAIL_FROM', '')
    if not sender:
        raise RuntimeError('Mail sender not configured')
    body = '\n\n'.join(f'{label}: {fields[key]}' for key, label in [
        ('name', 'Name'), ('email', 'Email'), ('organisation', 'Organisation'), ('message', 'Project details')])
    if os.environ.get('RESEND_API_KEY'):
        payload = json.dumps({'from': sender, 'to': [RECIPIENT], 'reply_to': fields['email'],
                              'subject': 'TR Technologies Group website enquiry', 'text': body}).encode()
        req = Request('https://api.resend.com/emails', data=payload, method='POST',
                      headers={'Authorization': 'Bearer ' + os.environ['RESEND_API_KEY'], 'Content-Type': 'application/json',
                               'User-Agent': 'TR-Technologies-Website/1.0'})
        with urlopen(req, timeout=15) as response:
            result = json.load(response)
            if not result.get('id'):
                raise RuntimeError('Mail provider did not accept enquiry')
        return
    host = os.environ.get('TR_SMTP_HOST', '')
    if not host:
        raise RuntimeError('Mail delivery not configured')
    mail = EmailMessage()
    mail['From'] = sender
    mail['To'] = RECIPIENT
    mail['Reply-To'] = fields['email']
    mail['Subject'] = 'TR Technologies Group website enquiry'
    mail['Message-ID'] = make_msgid(domain='trtechnologiesgroup.com')
    mail.set_content(body)
    port = int(os.environ.get('TR_SMTP_PORT', '465'))
    context = ssl.create_default_context()
    if port == 465:
        smtp = smtplib.SMTP_SSL(host, port, context=context, timeout=15)
    else:
        smtp = smtplib.SMTP(host, port, timeout=15)
    with smtp:
        if port != 465:
            smtp.starttls(context=context)
        if os.environ.get('TR_SMTP_USER'):
            smtp.login(os.environ['TR_SMTP_USER'], os.environ['TR_SMTP_PASSWORD'])
        refused = smtp.send_message(mail)
        if refused:
            raise RuntimeError('Mail recipient rejected')


class handler(BaseHTTPRequestHandler):
    def reply(self, code, payload):
        body = json.dumps(payload).encode()
        self.send_response(code)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Cache-Control', 'no-store')
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        self.reply(405, {'error': 'Please use the website enquiry form.'})

    def do_POST(self):
        origin = self.headers.get('Origin', '')
        allowed = {'https://www.trtechnologiesgroup.com', 'https://trtechnologiesgroup.com'}
        for name in ('VERCEL_URL', 'VERCEL_BRANCH_URL', 'VERCEL_PROJECT_PRODUCTION_URL'):
            if os.environ.get(name):
                allowed.add('https://' + os.environ[name])
        if origin and origin not in allowed:
            return self.reply(403, {'error': 'Please submit from the TR Technologies Group website.'})
        if self.headers.get('Content-Type', '').split(';')[0] != 'application/json':
            return self.reply(415, {'error': 'Please use the website enquiry form.'})
        try:
            length = int(self.headers.get('Content-Length', '0'))
            if not 0 < length <= 32000:
                return self.reply(413, {'error': 'Please shorten your enquiry and try again.'})
            fields = validate(json.loads(self.rfile.read(length)))
        except (ValueError, UnicodeError) as error:
            message = str(error) if type(error) is ValueError else 'Please check your enquiry and try again.'
            return self.reply(400, {'error': message})
        # A bounded, per-instance burst limit supplements the honeypot and same-origin check.
        address = self.headers.get('x-forwarded-for', self.client_address[0]).split(',')[0].strip()
        key = hashlib.sha256(address.encode()).hexdigest()
        now = time.monotonic()
        with _lock:
            for ip in list(_requests):
                _requests[ip] = [stamp for stamp in _requests[ip] if stamp > now - 600]
                if not _requests[ip]: del _requests[ip]
            history = _requests.setdefault(key, [])
            if len(history) >= 5 or len(_requests) > 5000:
                return self.reply(429, {'error': 'Please wait a few minutes before sending another enquiry.'})
            history.append(now)
        try:
            send_enquiry(fields)
        except Exception as error:
            # Do not log form contents, addresses, passwords or provider response bodies.
            print('Enquiry delivery failed:', type(error).__name__)
            return self.reply(503, {'error': 'Your enquiry could not be sent. Your details are still here. Please try again or contact info@trtechnologiesgroup.com.'})
        self.reply(200, {'message': 'Thanks. Your enquiry has been sent to TR Technologies Group.'})

    def log_message(self, format, *args):
        pass
