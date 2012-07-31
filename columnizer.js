var _ = require('underscore');

// pad
function pad(string, target) {
    return string + (new Array(target - string.length).join(' '));
}


var Columnizer = function Columnizer() {
    this.table = [];
};

Columnizer.prototype.row = function (args) {
    this.table.push(Array.prototype.slice.call(arguments, 0));
};

Columnizer.prototype.print = function (columnPadding) {
    console.log(this.toString(columnPadding));
};

Columnizer.prototype.toString = function (columnPadding) {
    var padding = columnPadding || 5,
        totalColumns = _.max(this.table, function (item) { return item.length; }).length,
        colWidths = [],
        result = [];

    // first we figure out what the max length is for each column
    _.each(this.table, function (row, index) {
        _.each(row, function (item, i) {
            colWidths[i] = ((colWidths[i] || 0) < item.length) ? item.length : colWidths[i];
        });
    });

    // now we can build our table
    _.each(this.table, function (row, index) {
        _.each(row, function (item, i) {
            row[i] = pad(item, colWidths[i] + padding);
        });
        result.push(row.join(''));
    });

    return result.join('\n');
};

// our export
module.exports = Columnizer;