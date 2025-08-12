FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip install torch && pip install -r requirements.txt

COPY . .
EXPOSE 5050
CMD ["python", "server.py"]
