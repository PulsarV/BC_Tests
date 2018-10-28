(function () {
    $('#dec-to-hex-go').on('click', function() {
        $('#dec-to-hex-out').val(decToHex($('#dec-to-hex-in').val()));
    });

    $('#dec-to-bin-go').on('click', function() {
        $('#dec-to-bin-out').val(decToBin($('#dec-to-bin-in').val()));
    });

    $('#hex-to-bin-go').on('click', function() {
        $('#hex-to-bin-out').val(hexToBin($('#hex-to-bin-in').val()));
    });

    $('#bin-to-hex-go').on('click', function() {
        $('#bin-to-hex-out').val(binToHex($('#bin-to-hex-in').val()));
    });

    $('#zipzap-go').on('click', function() {
        $('#zipzap-out').val(zipzap($('#zipzap-in').val()));
    });

    $('#circle-go').on('click', function() {
        var result = isInCircle($('#circle-radius').val(), $('#point-x').val(), $('#point-y').val()) ? 'In circle' :
            'Out of circle';
        $('#circle-out').val(result);
    });

    $('#water-go').on('click', function() {
        var relief = $('#water-in').val().split(',');
        $('#water-out').val(getWaterAmount(relief));
    });

    $('#sign-go').on('click', function() {
        $('#sign-out').val(createSign($('#key-in').val(), $('#text-in').val()));
    });
})();

function decToHex(n) {
    return parseInt(n, 10).toString(16);
}

function decToBin(n) {
    return parseInt(n, 10).toString(2);
}

function hexToBin(n) {
    return parseInt(n, 16).toString(2);
}

function binToHex(n) {
    return parseInt(n, 2).toString(16);
}

function zipzap(n) {
    var result = '';
    for (var i = 1; i <= n; i++) {
        var isMultiple3 = !(i % 3);
        var isMultiple5 = !(i % 5);

        if (!(isMultiple3 || isMultiple5)) {
            result += i;
        }

        if (isMultiple3) {
            result += 'zip';
        }

        if (isMultiple5) {
            result += 'zap';
        }
    }

    return result;
}

function isInCircle(r, x, y) {
    return (Math.pow(x, 2) + Math.pow(y, 2) <= Math.pow(r, 2));
}

function getWaterAmount(relief) {
    var totalCapacity = 0;
    var trenchWidth = 0;
    var trenchCapacity = 0;
    var subTrenchCapacity = 0;
    var maxHeight = 0;
    var currentHeight = 0;
    var leftBank = 0;

    for (var i = 0; i < relief.length; i++) {
        currentHeight = relief[i];

        if (!i) {
            leftBank = currentHeight;
            continue;
        }

        if (currentHeight < leftBank) {
            if (currentHeight > maxHeight) {
                trenchCapacity += subTrenchCapacity + trenchWidth * (currentHeight - maxHeight);
                subTrenchCapacity = 0;
                maxHeight = currentHeight;
            } else {
                subTrenchCapacity += maxHeight - currentHeight;
            }

            if (i === relief.length - 1) {
                totalCapacity += trenchCapacity;
            }

            trenchWidth++;
        } else {
            trenchCapacity += subTrenchCapacity + trenchWidth * (leftBank - maxHeight);
            totalCapacity += trenchCapacity;
            leftBank = currentHeight;
            trenchCapacity = 0;
            subTrenchCapacity = 0;
            trenchWidth = 0;
            maxHeight = 0;
        }
    }

    return totalCapacity;
}

function createSign(privateKey, data) {
    var cryptor = new JSEncrypt();
    cryptor.setKey(privateKey);

    return cryptor.encrypt(sha256(data));
}