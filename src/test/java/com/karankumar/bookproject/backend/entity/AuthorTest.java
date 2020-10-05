/*
    The book project lets a user keep track of different books they would like to read, are currently
    reading, have read or did not finish.
    Copyright (C) 2020  Karan Kumar

    This program is free software: you can redistribute it and/or modify it under the terms of the
    GNU General Public License as published by the Free Software Foundation, either version 3 of the
    License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful, but WITHOUT ANY
    WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR
    PURPOSE.  See the GNU General Public License for more details.

    You should have received a copy of the GNU General Public License along with this program.
    If not, see <https://www.gnu.org/licenses/>.
 */

package com.karankumar.bookproject.backend.entity;

import com.karankumar.bookproject.annotations.IntegrationTest;
import com.karankumar.bookproject.backend.service.AuthorService;
import com.karankumar.bookproject.backend.service.BookService;
import com.karankumar.bookproject.backend.service.PredefinedShelfService;
import com.karankumar.bookproject.backend.utils.PredefinedShelfUtils;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.jupiter.api.Assertions.*;

@IntegrationTest
class AuthorTest {
    private static BookService bookService;

    private static AuthorService authorService;
    private static PredefinedShelf toRead;
    private Book testBook1;
    private Book testBook2;
    @BeforeAll
    public static void setup(@Autowired PredefinedShelfService predefinedShelfService,
                             @Autowired BookService bookService,
                             @Autowired AuthorService authorService) {
        AuthorTest.bookService = bookService;
        AuthorTest.authorService = authorService;

        resetBookService();
    }

    @BeforeEach
    public void reset(@Autowired PredefinedShelfService predefinedShelfService) {
        resetBookService();

        toRead = new PredefinedShelfUtils(predefinedShelfService).findToReadShelf();
    }

    private static void resetBookService() {
        bookService.deleteAll();
    }

    private static Book createBook(String title, PredefinedShelf shelf) {
        Author author = new Author("Steven", "Pinker");
        return new Book(title, author, shelf);
    }

    /**
     * Updating the author of a book should only affect that book, not any other book that
     * originally had the same author name
     */
    @Test
    void updateAuthorAffectsOneRow() {
        // Given
        testBook1 = createBook("How the mind works", toRead);
        testBook2 = createBook("The better angels of our nature", toRead);
        bookService.save(testBook1);
        bookService.save(testBook2);
        // When
        Author newAuthor = new Author("Matthew", "Walker");
        testBook1.setAuthor(newAuthor);
        bookService.save(testBook1);
        // Then
        Assertions.assertNotEquals(testBook1.getAuthor(), testBook2.getAuthor());
    }

    @Test
    @DisplayName("Orphan authors should be removed when deleting last book")
    void orphanAuthorsRemoved() {
        // Given
        Author orphan = new Author("Jostein", "Gardner");
        Book book = new Book("Sophie's World", orphan, toRead);
        bookService.save(book);
        // When
        bookService.delete(book);
        // Then
        assertAll(
                () -> assertTrue(authorService.findAll().isEmpty())
        );
    }
    @Test
    @DisplayName("Non orphan authors shouldn't be removed when deleting one of their books")
    void nonOrphansNotRemoved() {
        // Given
        Author nonOrphan = new Author("Jostein", "Gardner");
        Book book = new Book("Sophie's World", nonOrphan, toRead);
        bookService.save(book);
        Book book2 = new Book("The Other World", nonOrphan, toRead);
        bookService.save(book2);
        // When
        bookService.delete(book);
        // Then
        assertAll(
                () -> assertEquals(1, authorService.count()),
                () -> assertEquals(1, bookService.count())
        );
    }
}
