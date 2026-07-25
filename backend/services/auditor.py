import requests
import time
from bs4 import BeautifulSoup
from urllib.parse import urlparse

def perform_audit(url: str):
    start_time = time.time()
    
    # Pre-validate URL
    parsed = urlparse(url)
    if not parsed.scheme or not parsed.netloc:
        raise ValueError("Invalid URL. Make sure it includes http:// or https://")
        
    try:
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}
        response = requests.get(url, headers=headers, timeout=10)
        
        # Calculate response time in ms
        response_time = int((time.time() - start_time) * 1000)
        content_type = response.headers.get('Content-Type', '').lower()
        protocol = parsed.scheme.upper()
        
        non_html_types = ['application/pdf', 'image/', 'application/json', 'application/octet-stream']
        if any(t in content_type for t in non_html_types):
            raise ValueError("Non HTML Content")
            
        soup = BeautifulSoup(response.content, 'html.parser')
        
        title_tag = soup.find('title')
        title = title_tag.text.strip() if title_tag else ''
        
        meta_desc = 'No meta description found'
        meta_tag = soup.find('meta', attrs={'name': 'description'})
        if meta_tag and meta_tag.get('content'):
            meta_desc = meta_tag['content'].strip()
            
        h1_tags = soup.find_all('h1')
        h1_count = len(h1_tags)
        
        images = soup.find_all('img')
        total_images = len(images)
        missing_alt = sum(1 for img in images if not img.get('alt'))
        
        # Get visible text to approximate word count
        text = soup.get_text(separator=' ', strip=True)
        word_count = len(text.split())
        
        return {
            'status': response.status_code,
            'response_time': response_time,
            'title': title,
            'meta_description': meta_desc,
            'h1_count': h1_count,
            'total_images': total_images,
            'missing_alt': missing_alt,
            'word_count': word_count,
            'content_type': content_type,
            'protocol': protocol
        }
        
    except requests.exceptions.Timeout:
        raise ValueError("Request Timed Out")
    except requests.exceptions.SSLError:
        raise ValueError("SSL Error")
    except requests.exceptions.InvalidURL:
        raise ValueError("Invalid URL")
    except requests.exceptions.ConnectionError:
        raise ValueError("Connection Refused")
    except requests.exceptions.RequestException:
        raise ValueError("Generic request error")
