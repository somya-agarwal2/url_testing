import pytest
import requests
from unittest.mock import patch, MagicMock
from app import create_app
from models import db

@pytest.fixture
def app():
    # Setup test app with in-memory SQLite DB
    app = create_app({
        'TESTING': True,
        'SQLALCHEMY_DATABASE_URI': 'sqlite:///:memory:'
    })
    
    with app.app_context():
        db.create_all()
        yield app
        db.session.remove()
        db.drop_all()

@pytest.fixture
def client(app):
    return app.test_client()

# ==================================================
# Test 1 - Valid HTML Page
# ==================================================
@patch('services.auditor.requests.get')
def test_valid_html_page(mock_get, client):
    """Mock a successful HTML response with full details."""
    mock_response = MagicMock()
    mock_response.status_code = 200
    mock_response.headers = {'Content-Type': 'text/html; charset=utf-8'}
    mock_response.content = b'''
        <html>
            <head>
                <title>Valid Title</title>
                <meta name="description" content="Valid Description">
            </head>
            <body>
                <h1>Header 1</h1>
                <img src="1.jpg" alt="img1">
                <p>This is a test paragraph with several words.</p>
            </body>
        </html>
    '''
    mock_get.return_value = mock_response
    
    response = client.post('/audit', json={'url': 'https://example.com'})
    assert response.status_code == 200
    data = response.get_json()
    assert data['status'] == 200
    assert data['title'] == 'Valid Title'
    assert data['meta_description'] == 'Valid Description'
    assert data['h1_count'] == 1
    assert data['word_count'] > 0
    assert data['missing_alt'] == 0

# ==================================================
# Test 2 - Page Without Meta Description
# ==================================================
@patch('services.auditor.requests.get')
def test_page_without_meta_description(mock_get, client):
    """Mock HTML with no meta description and verify fallback string."""
    mock_response = MagicMock()
    mock_response.status_code = 200
    mock_response.headers = {'Content-Type': 'text/html'}
    mock_response.content = b'<html><head><title>Test</title></head><body>Hello</body></html>'
    mock_get.return_value = mock_response
    
    response = client.post('/audit', json={'url': 'https://example.com'})
    data = response.get_json()
    assert data['meta_description'] == 'No meta description found'

# ==================================================
# Test 3 - Page Without H1
# ==================================================
@patch('services.auditor.requests.get')
def test_page_without_h1(mock_get, client):
    """Mock HTML containing no <h1> tag."""
    mock_response = MagicMock()
    mock_response.status_code = 200
    mock_response.headers = {'Content-Type': 'text/html'}
    mock_response.content = b'<html><body><h2>Subtitle</h2></body></html>'
    mock_get.return_value = mock_response
    
    response = client.post('/audit', json={'url': 'https://example.com'})
    data = response.get_json()
    assert data['h1_count'] == 0

# ==================================================
# Test 4 - Images Missing Alt
# ==================================================
@patch('services.auditor.requests.get')
def test_images_missing_alt(mock_get, client):
    """Mock HTML containing images with and without alt text."""
    mock_response = MagicMock()
    mock_response.status_code = 200
    mock_response.headers = {'Content-Type': 'text/html'}
    mock_response.content = b'''
        <html><body>
            <img src="a.jpg">
            <img src="b.jpg" alt="Logo">
            <img src="c.jpg">
        </body></html>
    '''
    mock_get.return_value = mock_response
    
    response = client.post('/audit', json={'url': 'https://example.com'})
    data = response.get_json()
    assert data['total_images'] == 3
    assert data['missing_alt'] == 2

# ==================================================
# Test 5 - Invalid URL
# ==================================================
@patch('services.auditor.requests.get')
def test_invalid_url(mock_get, client):
    """Mock InvalidURL exception."""
    mock_get.side_effect = requests.exceptions.InvalidURL("Invalid URL")
    
    response = client.post('/audit', json={'url': 'https://invalid'})
    assert response.status_code == 400
    assert response.get_json()['error'] == 'Invalid URL'

# ==================================================
# Test 6 - Connection Error
# ==================================================
@patch('services.auditor.requests.get')
def test_connection_error(mock_get, client):
    """Mock requests.exceptions.ConnectionError."""
    mock_get.side_effect = requests.exceptions.ConnectionError("Connection Refused")
    
    response = client.post('/audit', json={'url': 'https://example.com'})
    assert response.status_code == 500
    assert response.get_json()['error'] == 'Connection Refused'

# ==================================================
# Test 7 - Timeout
# ==================================================
@patch('services.auditor.requests.get')
def test_timeout(mock_get, client):
    """Mock requests.exceptions.Timeout."""
    mock_get.side_effect = requests.exceptions.Timeout("Timeout")
    
    response = client.post('/audit', json={'url': 'https://example.com'})
    assert response.status_code == 500
    assert response.get_json()['error'] == 'Request Timed Out'

# ==================================================
# Test 8 - Non HTML Content
# ==================================================
@patch('services.auditor.requests.get')
def test_non_html_content(mock_get, client):
    """Mock response Content-Type: application/pdf"""
    mock_response = MagicMock()
    mock_response.status_code = 200
    mock_response.headers = {'Content-Type': 'application/pdf'}
    mock_response.content = b'%PDF-1.4...'
    mock_get.return_value = mock_response
    
    response = client.post('/audit', json={'url': 'https://example.com/doc.pdf'})
    assert response.status_code == 400
    assert response.get_json()['error'] == 'Non HTML Content'

# ==================================================
# Test 9 - HTTP 404 Page
# ==================================================
@patch('services.auditor.requests.get')
def test_http_404_page(mock_get, client):
    """Mock 404 response to verify HTML is still parsed."""
    mock_response = MagicMock()
    mock_response.status_code = 404
    mock_response.headers = {'Content-Type': 'text/html'}
    mock_response.content = b'<html><body><h1>Page Not Found</h1></body></html>'
    mock_get.return_value = mock_response
    
    response = client.post('/audit', json={'url': 'https://example.com/404'})
    assert response.status_code == 200
    data = response.get_json()
    assert data['status'] == 404
    assert data['h1_count'] == 1

# ==================================================
# Test 10 - HTTP 500 Page
# ==================================================
@patch('services.auditor.requests.get')
def test_http_500_page(mock_get, client):
    """Mock 500 response to verify backend returns status 500 info."""
    mock_response = MagicMock()
    mock_response.status_code = 500
    mock_response.headers = {'Content-Type': 'text/html'}
    mock_response.content = b'<html><body>Internal Server Error</body></html>'
    mock_get.return_value = mock_response
    
    response = client.post('/audit', json={'url': 'https://example.com/500'})
    assert response.status_code == 200
    data = response.get_json()
    assert data['status'] == 500

# ==================================================
# Test 11 - Response Time
# ==================================================
@patch('services.auditor.requests.get')
def test_response_time(mock_get, client):
    """Mock timing values implicitly by normal request flow."""
    mock_response = MagicMock()
    mock_response.status_code = 200
    mock_response.headers = {'Content-Type': 'text/html'}
    mock_response.content = b'<html></html>'
    mock_get.return_value = mock_response
    
    response = client.post('/audit', json={'url': 'https://example.com'})
    data = response.get_json()
    assert isinstance(data['response_time'], int)
    assert data['response_time'] >= 0

# ==================================================
# Test 12 - Protocol Detection
# ==================================================
@patch('services.auditor.requests.get')
def test_protocol_detection(mock_get, client):
    """Test protocol == HTTPS for https:// URL."""
    mock_response = MagicMock()
    mock_response.status_code = 200
    mock_response.headers = {'Content-Type': 'text/html'}
    mock_response.content = b'<html></html>'
    mock_get.return_value = mock_response
    
    response = client.post('/audit', json={'url': 'https://example.com'})
    data = response.get_json()
    assert data['protocol'] == 'HTTPS'
