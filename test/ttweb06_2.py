# 필요한 라이브러리를 임포트합니다.
import yfinance as yf
import pandas as pd
import plotly.express as px
import plotly.io as pio
from flask import Flask, render_template, request
from datetime import datetime, timedelta


#today = datetime.today().strftime('%Y-%m-%d')

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
def dashboard():
    tickers = ['AAPL', 'MSFT', 'GOOGL', 'AMZN']  # 대시보드에 표시할 종목 리스트입니다.
    return render_template('stock_dashboard6_2.html', tickers=tickers)  # 종목 리스트를 HTML에 전달합니다.


@app.route('/chart/<ticker>', methods=['GET'])
def stock_chart(ticker):
    date = request.args.get('date')
    if not date:
        date = datetime.now().strftime('%Y-%m-%d')

    # 종료 날짜를 시작 날짜보다 7일 후로 설정합니다.
    end_date = (datetime.strptime(date, '%Y-%m-%d') + timedelta(days=7)).strftime('%Y-%m-%d')
    data = get_stock_data(ticker, date, end_date)

    # 여러 일의 데이터 중에서 가장 최근의 데이터만 사용합니다.
    data = data.tail(1)

    chart = plot_stock_chart(data)
    chart_html = pio.to_html(chart, full_html=False)

    previous_date = (datetime.strptime(date, '%Y-%m-%d') - timedelta(days=1)).strftime('%Y-%m-%d')
    next_date = (datetime.strptime(date, '%Y-%m-%d') + timedelta(days=1)).strftime('%Y-%m-%d')

    return render_template('stock_chart6_2.html', chart=chart_html, ticker=ticker, date=date, previous_date=previous_date, next_date=next_date)

if __name__ == '__main__':
    app.run()
