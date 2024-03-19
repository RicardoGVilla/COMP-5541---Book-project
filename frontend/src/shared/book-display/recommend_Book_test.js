"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var CHAR_LIMIT = 40;
var BookList = /** @class */ (function (_super) {
    __extends(BookList, _super);
    function BookList(props) {
        return _super.call(this, props) || this;
    }
    return BookList;
}(React.Component));
exports.default = BookList;
function recommendBooks(Books, readBooks, readingBooks) {
    var genreCounts = {};
    Books.forEach(function (book) {
        book.bookGenre.forEach(function (genre) {
            genreCounts[genre] = (genreCounts[genre] || 0) + 1;
        });
    });
    var sortedGenres = Object.keys(genreCounts).sort(function (a, b) { return genreCounts[b] - genreCounts[a]; });
    var mostReadGenre = sortedGenres[0];
    var secondMostReadGenre = sortedGenres[1];
    var authorCounts = {};
    Books.forEach(function (book) {
        var authorName = book.author.fullName;
        authorCounts[authorName] = (authorCounts[authorName] || 0) + 1;
    });
    var sortedAuthors = Object.keys(authorCounts).sort(function (a, b) { return authorCounts[b] - authorCounts[a]; }).slice(0, 5);
    var recommendedBooks = Books.filter(function (book) {
        return ((book.bookGenre.includes(mostReadGenre) || book.bookGenre.includes(secondMostReadGenre)) &&
            sortedAuthors.includes(book.author.fullName) &&
            !readBooks.some(function (readBook) { return readBook.id === book.id; }) &&
            !readingBooks.some(function (readingBook) { return readingBook.id === book.id; }));
    });
    var shuffledBooks = recommendedBooks.sort(function () { return Math.random() - 0.5; });
    return shuffledBooks.slice(0, 2);
}
// Sample book Data:
var sampleBooks = [
    {
        id: 1,
        title: 'Sample Book 1',
        img: 'sample1.jpg',
        author: { fullName: 'Author One' },
        predefinedShelf: { shelfName: 'Thriller' },
        bookGenre: ['Fiction'],
        numberOfPages: 300,
        rating: 4.5,
    },
    {
        id: 2,
        title: 'Sample Book 2',
        img: 'sample2.jpg',
        author: { fullName: 'Author Two' },
        predefinedShelf: { shelfName: 'Thriller' },
        bookGenre: ['Mystery'],
        numberOfPages: 250,
        rating: 4.0,
    },
    {
        id: 3,
        title: 'Sample Book 3',
        img: 'sample3.jpg',
        author: { fullName: 'Author One' },
        predefinedShelf: { shelfName: 'Science Fiction' },
        bookGenre: ['Science Fiction'],
        numberOfPages: 400,
        rating: 4.2,
    },
    {
        id: 4,
        title: 'Sample Book 4',
        img: 'sample4.jpg',
        author: { fullName: 'Author Four' },
        predefinedShelf: { shelfName: 'Fantasy' },
        bookGenre: ['Fantasy'],
        numberOfPages: 500,
        rating: 4.8,
    },
    {
        id: 5,
        title: 'Sample Book 5',
        img: 'sample5.jpg',
        author: { fullName: 'Author One' },
        predefinedShelf: { shelfName: 'Romance' },
        bookGenre: ['Romance'],
        numberOfPages: 350,
        rating: 3.9,
    }
];
var sampleReadBooks = [
    {
        id: 6,
        title: 'Sample Read Book 1',
        img: 'read1.jpg',
        author: { fullName: 'Author Six' },
        predefinedShelf: { shelfName: 'Thriller' },
        bookGenre: ['Historical Fiction'],
        numberOfPages: 320,
        rating: 4.1,
    },
    {
        id: 7,
        title: 'Sample Read Book 2',
        img: 'read2.jpg',
        author: { fullName: 'Author Seven' },
        predefinedShelf: { shelfName: 'Thriller' },
        bookGenre: ['Thriller'],
        numberOfPages: 280,
        rating: 4.6,
    }
];
var sampleReadingBooks = [
    {
        id: 8,
        title: 'Sample Reading Book 1',
        img: 'reading1.jpg',
        author: { fullName: 'Author Eight' },
        predefinedShelf: { shelfName: 'Thriller' },
        bookGenre: ['Science'],
        numberOfPages: 280,
        rating: 3.8,
    },
    {
        id: 9,
        title: 'Sample Reading Book 2',
        img: 'reading2.jpg',
        author: { fullName: 'Author Nine' },
        predefinedShelf: { shelfName: 'Biography' },
        bookGenre: ['Biography'],
        numberOfPages: 400,
        rating: 4.3,
    }
];
var recommendedBooks = recommendBooks(sampleBooks, sampleReadBooks, sampleReadingBooks);
console.log('Recommended Books:', recommendedBooks);
