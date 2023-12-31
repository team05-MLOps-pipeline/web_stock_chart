import yfinance as yf
import pandas as pd
import plotly.express as px
import plotly.io as pio
from flask import Flask, render_template, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/stock/<ticker>', methods=['GET'])
def get_stock_data(ticker):
    stock = yf.Ticker(ticker)
    data = stock.history(period="1y")  # 일일 데이터를 가져옵니다.
    return data.to_json(orient='index')


@app.route('/tickers', methods=['GET'])
def get_tickers():
    tickers = ['AAPL', 'GOOGL', 'TSLA', 'AMZN', 'MSFT']  # 실제 사용할 종목 리스트로 교체해 주세요.
    return jsonify(tickers)

if __name__ == '__main__':
    app.run(port=5000, debug=True)