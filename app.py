from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def clock():
    return render_template("clock.html")

if __name__ == "__main__":
    app.run(debug=True)

