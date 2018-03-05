IP_ADDRESS=$(wget -qO- http://ipecho.net/plain; echo)
SENTINEL_DIR=$HOME/.ethereum;
PORT=8333;

cd /root;

if [ "$SENT_ENV" != "DEV" ]; then
  PORT=8000

nohup mongod >> /dev/null &
gunicorn --reload -b 0.0.0.0:$PORT app:app;

