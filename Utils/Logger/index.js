class Logger {

    static log(text, type) {

        console.log(new Date() + ' - PG CONNECTION  ::::: ' +type+ ' ::::: ' + text);
    }

    static info(text) {
        this.log(text, 'INFO');
    }
    static debug(text) {

        this.log(text, 'DEBUG');
    }
    static error(text) {

        this.log(text, 'ERROR');
    }
}


module.exports = Logger;