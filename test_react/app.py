import yfinance as yf
import pandas as pd
import plotly.express as px
import plotly.io as pio
from flask import Flask, render_template, jsonify
from flask_cors import CORS

app = Flask(__name__)


@app.route('/stock/<ticker>', methods=['GET'])
def get_stock_data(ticker):
    stock = yf.Ticker(ticker)
    data = stock.history(period="1y")  # 일일 데이터를 가져옵니다.
    return data.to_json(orient='index')

if __name__ == '__main__':
    CORS(app.run(port=5000, debug=True))