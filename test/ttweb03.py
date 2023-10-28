# 필요한 라이브러리를 임포트합니다.
import yfinance as yf
import pandas as pd
import plotly.express as px
from flask import Flask, render_template
from io import BytesIO
import plotly.io as pio
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
    fig.update_layout(autosize=True)  # 그래프를 반응형으로 만듭니다.
    return fig

@app.route('/')
def stock_chart():
    ticker = "AAPL"
    start_date = "2023-01-01"
    end_date = "2023-10-01"

    data = get_stock_data(ticker, start_date, end_date)
    chart = plot_stock_chart(data)

    chart_html = pio.to_html(chart, full_html=False)  # Plotly 그래프를 HTML로 변환합니다.

    return render_template('stock_chart3.html', chart=chart_html)  # HTML을 웹 페이지에 전달합니다.

if __name__ == '__main__':
    app.run()