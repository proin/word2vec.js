exports = module.exports = function (opts) {
    var dummy = function () {
    };

    if (!opts) opts = {};
    if (!opts.done) opts.done = dummy;
    if (!opts.on) opts.on = dummy;
    if (!opts.error) opts.error = dummy;

    if (!opts.train || !opts.output) {
        opts.error('missing options. train, output');
        return;
    }

    if (!opts['cbow']) opts['cbow'] = 1;
    if (!opts['size']) opts['size'] = 200;
    if (!opts['window']) opts['window'] = 8;
    if (!opts['negative']) opts['negative'] = 25;
    if (!opts['hs']) opts['hs'] = 0;
    if (!opts['sample']) opts['sample'] = '1e-4';
    if (!opts['threads']) opts['threads'] = 20;
    if (!opts['binary']) opts['binary'] = 1;
    if (!opts['iter']) opts['iter'] = 15;

    var exec = function () {
        var errMsg = null;
        var args = [
            __dirname + '/bin/word2vec'
        ];

        for (var key in opts) {
            if (typeof opts[key] == 'function')
                continue;
            args.push('-' + key);
            if (opts[key] && (opts[key] + '').length > 0) {
                if (key == 'output')
                    args.push(opts[key] + '.bin');
                else
                    args.push(opts[key] + '');
            }
        }

        var str = '';
        for (var i = 1; i < args.length; i++)  str += args[i] + ' ';
        opts.on('word2vec start with options:\n\t' + str + '\n\n');

        var spawn = require('child_process').spawn;
        var cmd = spawn('time', args);

        cmd.stdout.on('data', function (data) {
            if ((data + '').indexOf('ERROR') != -1) {
                errMsg = data + '';
            } else {
                opts.on(data + '');
            }
        });

        cmd.on('close', function () {
            if (errMsg) {
                opts.error(errMsg);
            } else {
                reformat();
            }
        });
    };

    var reformat = function () {
        var spawn = require('child_process').spawn;
        var cmd = spawn(__dirname + '/bin/binary2txt', [opts.output + '.bin', opts.output]);

        cmd.stdout.on('data', function (data) {
            opts.on(data + '');
        });

        cmd.on('close', function () {
            opts.done();
        });
    };

    exec();
};