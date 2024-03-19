package com.karankumar.bookproject.book.repository;

import com.karankumar.bookproject.account.model.User;
import com.karankumar.bookproject.book.model.Book;
import com.karankumar.bookproject.shelf.model.PredefinedShelf.ShelfName;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

import javax.persistence.Entity;

public interface BookRepository extends JpaRepository<Book, Long> {
  @EntityGraph(value = "Book.author", type = EntityGraph.EntityGraphType.LOAD)
  @Query(
      "SELECT b "
          + "FROM Book b "
          + "INNER JOIN FETCH b.author "
          + "INNER JOIN FETCH b.bookCover "
          + "INNER JOIN FETCH b.predefinedShelf "
          + "INNER JOIN FETCH b.tags "
          + "INNER JOIN FETCH b.publishers")
  List<Book> findAllBooks(Pageable pageable);

  @EntityGraph(value = "Book.author", type = EntityGraph.EntityGraphType.LOAD)
  List<Book> findAll();

  @EntityGraph(value = "Book.author", type = EntityGraph.EntityGraphType.LOAD)
  @Query(
      "SELECT b "
          + "FROM Book b "
          + "INNER JOIN FETCH b.author "
          + "INNER JOIN FETCH b.bookCover "
          + "INNER JOIN FETCH b.predefinedShelf "
          + "INNER JOIN FETCH b.tags "
          + "INNER JOIN FETCH b.publishers "
          + "WHERE b.id = :id")
  Optional<Book> findBookById(@Param("id") Long id);

  @EntityGraph(value = "Book.author", type = EntityGraph.EntityGraphType.LOAD)
  List<Book> findByTitleContainingIgnoreCase(String title);

  @EntityGraph(value = "Book.author", type = EntityGraph.EntityGraphType.LOAD)
  @Query(
      "SELECT b "
          + "FROM Book b "
          + "INNER JOIN FETCH b.author AS a "
          + "INNER JOIN FETCH b.predefinedShelf "
          + "INNER JOIN FETCH b.tags "
          + "INNER JOIN FETCH b.publishers "
          + "WHERE LOWER(b.title) LIKE LOWER(CONCAT('%', :titleOrAuthor, '%')) OR "
          + "LOWER(a.fullName) LIKE LOWER(CONCAT('%', :titleOrAuthor, '%'))")
  List<Book> findByTitleOrAuthor(@Param("titleOrAuthor") String titleOrAuthor);

  //New method
  @EntityGraph(value = "Book.author", type = EntityGraph.EntityGraphType.LOAD)
  @Query(
    "SELECT b "
          + "FROM Book b "
          + "INNER JOIN FETCH b.author "
          + "INNER JOIN FETCH b.bookCover "
          + "INNER JOIN FETCH b.predefinedShelf s "
          + "INNER JOIN FETCH b.tags "
          + "INNER JOIN FETCH b.publishers "
          + "WHERE b.bookCover IS NOT NULL")
  List<Book>findAllBooksWithCover();

  @EntityGraph(value = "Book.author", type = EntityGraph.EntityGraphType.LOAD)
  @Query(
      "SELECT b "
          + "FROM Book b "
          + "INNER JOIN FETCH b.author "
          + "INNER JOIN FETCH b.bookCover "
          + "INNER JOIN FETCH b.predefinedShelf s "
          + "INNER JOIN FETCH b.tags "
          + "INNER JOIN FETCH b.publishers "
          + "WHERE s.predefinedShelfName = :predefinedShelfName")
  List<Book> findAllBooksByPredefinedShelfShelfName(
      @Param("predefinedShelfName") ShelfName predefinedShelfName);

  @EntityGraph(value = "Book.author", type = EntityGraph.EntityGraphType.LOAD)
  @Query(
      "SELECT b "
          + "FROM Book b "
          + "INNER JOIN FETCH b.author "
          + "INNER JOIN FETCH b.predefinedShelf pds "
          + "LEFT JOIN FETCH b.bookGenre "
          + "LEFT JOIN FETCH b.bookCover "
          + "LEFT JOIN FETCH b.publishers "
          + "LEFT JOIN FETCH b.tags "
          + "LEFT JOIN FETCH b.userCreatedShelf ucs "
          + "WHERE pds.user = :user "
          + "AND (ucs is NULL OR ucs.user = :user)")
  List<Book> findAllBooksForUser(@Param("user") User user);
}
