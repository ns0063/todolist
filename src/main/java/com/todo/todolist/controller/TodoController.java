package com.todo.todolist.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.todo.todolist.entity.Todo;
import com.todo.todolist.repository.TodoRepository;

@RestController
@RequestMapping("/todos")
@CrossOrigin("*")
public class TodoController {

    @Autowired
    private TodoRepository todoRepository;


    // GET ALL TASKS
    @GetMapping
    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }


    // ADD TASK
    @PostMapping
    public Todo addTodo(@RequestBody Todo todo) {
        return todoRepository.save(todo);
    }


    // UPDATE TASK
    @PutMapping("/{id}")
    public Todo updateTodo(@PathVariable Long id,
                           @RequestBody Todo updatedTodo) {

        Todo todo = todoRepository.findById(id).orElseThrow();

        todo.setTask(updatedTodo.getTask());
        todo.setCompleted(updatedTodo.isCompleted());

        return todoRepository.save(todo);
    }


    // DELETE TASK
    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable Long id) {
        todoRepository.deleteById(id);
    }
}