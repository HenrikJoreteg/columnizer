var _ = require('underscore');

// pad
function pad(string, target) {
    return string + (new Array(target - string.length).join(' '));
}


var Columnizer = function Columnizer() {
    this.columns = [];
};

Columnizer.prototype.row = function (args) {
    this.columns.push(Array.prototype.slice.call(arguments, 0));
};

Columnizer.prototype.print = function (columnPadding) {
    var padding = columnPadding || 5,
        totalColumns = _.max(this.columns, function (item) { return item.length; }).length,
        colWidths = [];

    this.columns.forEach(function (row) {
        for (var i = 0, l = row.length; i < totalColumns; i++) {
            colWidths[i] = ((colWidths[i] || 0) < row[i].length) ? row[i].length : colWidths[i];
        }
    });

    for (var j = 0, l = this.columns.length; j < l; j++) {
        for (var i = 0; i < totalColumns; i++) {
            this.columns[j][i] = pad(this.columns[j][i], colWidths[i] + padding);
        }
        console.log(this.columns[j].join(''));
    }
};

// our exports
exports.Columnizer = Columnizer;
exports.create = function (args) {
    return new Columnizer(args);
};