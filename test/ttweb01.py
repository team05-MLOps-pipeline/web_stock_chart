# 필요한 라이브러리를 임포트합니다.
import yfinance as yf
import pandas as pd
import plotly.express as px
from flask import Flask, render_template
from io import BytesIO
import base64

# Flask 앱을 생성합니다.
app = Flask(__name__)

# 주식 데이터를 가져오는 함수를 정의합니다.
def get_stock_data(ticker, start_date, end_date):
    data = yf.download(ticker, start=start_date, end=end_date)
    return data

# 주식 데이터를 차트로 그리는 함수를 정의합니다.
def plot_stock_chart(data):
    fig = px.line(data, x=data.index, y="Close", title="Stock Price Chart")
    return fig

# 웹 서버 루트 경로에 접근하면 주식 차트를 보여주는 페이지를 반환합니다.
@app.route('/')
def stock_chart():
    ticker = "AAPL"  # 주식 종목을 원하는 종목으로 변경하세요
    start_date = "2023-01-01"  # 데이터 시작 날짜를 설정하세요
    end_date = "2023-10-01"  # 데이터 종료 날짜를 설정하세요

    data = get_stock_data(ticker, start_date, end_date)
    chart = plot_stock_chart(data)

    # Plotly 그래프를 이미지로 변환하여 웹 페이지에 표시합니다.
    chart_bytes = chart.to_image(format="png")
    chart_base64 = base64.b64encode(chart_bytes).decode('utf-8')
    return render_template('stock_chart1.html', chart_base64=chart_base64)

if __name__ == '__main__':
    app.run()