import pytest
from io import BytesIO
from server import app  # Import your Flask app
from PIL import Image

# Fixture for Flask test client
@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def get_valid_image():
    """Generate a valid PNG image in memory"""
    img = Image.new("RGB", (10, 10), color=(255, 255, 255))  # Create a white 10x10 image
    buffer = BytesIO()
    img.save(buffer, format="PNG")
    buffer.seek(0)  # Reset buffer to the beginning
    return buffer

# Test: Missing model selection
def test_missing_model(client):
    response = client.post('/upload_test', data={})
    assert response.status_code == 400
    assert response.json['error'] == 'Model selection is missing'

# Test: Valid image upload for "skin" model
def test_valid_image_upload_skin(client):
    data = {
        'model': 'skin',
        'userFile': (get_valid_image(), 'test_image.png')
    }
    response = client.post('/upload_test', data=data, content_type='multipart/form-data')
    assert response.status_code == 200
    assert 'originalImages' in response.json
    assert 'processedImages' in response.json
    assert 'timeTaken' in response.json

# Test: Valid image upload for "nuclei" model
def test_valid_image_upload_nuclei(client):
    data = {
        'model': 'nuclei',
        'userFile': (get_valid_image(), 'test_image.png')
    }
    response = client.post('/upload_test', data=data, content_type='multipart/form-data')
    assert response.status_code == 200
    assert 'originalImages' in response.json
    assert 'processedImages' in response.json
    assert 'timeTaken' in response.json

# Test: No files uploaded
def test_no_files_uploaded(client):
    data = {
        'model': 'skin'
    }
    response = client.post('/upload_test', data=data)
    assert response.status_code == 400
    assert response.json['error'] == 'No valid images provided'

# Test: Multiple image uploads
def test_multiple_images_upload(client):
    data = {
        'model': 'skin',
        'userFile': [
            (get_valid_image(), 'test_image_1.png'),
            (get_valid_image(), 'test_image_2.png')
        ]
    }
    response = client.post('/upload_test', data=data, content_type='multipart/form-data')
    assert response.status_code == 200
    assert len(response.json['originalImages']) == 2
    assert len(response.json['processedImages']) == 2
    assert len(response.json['timeTaken']) == 2
