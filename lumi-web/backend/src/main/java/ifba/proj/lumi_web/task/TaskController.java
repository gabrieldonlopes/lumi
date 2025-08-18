package ifba.proj.lumi_web.task;

import org.apache.coyote.BadRequestException;
import org.springframework.beans.BeanUtils;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import jakarta.validation.Valid;
import org.springframework.web.server.ResponseStatusException;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
public class TaskController {
    private final TaskRepository repository;
    private final TaskAssembler assembler;

    public TaskController(TaskRepository repository, TaskAssembler assembler) {
        this.repository = repository;
        this.assembler = assembler;
    }

    @GetMapping("/tasks")
    CollectionModel<EntityModel<Task>> all() {
        List<EntityModel<Task>> tasks = repository.findAll().stream()
                .map(assembler::toModel)
                .collect(Collectors.toList());

        return CollectionModel.of(tasks,linkTo(methodOn(TaskController.class).all()).withSelfRel());
    }

    @GetMapping("/tasks/{id_task}")
    EntityModel<Task> one(@PathVariable Long id_task) {

        Task task = repository.findById(id_task)
                .orElseThrow(()-> new TaskNotFoundException(id_task));

        return assembler.toModel(task);
    }

    @PostMapping("/tasks")
    Task newTask(@Valid @RequestBody Task newTask){
        LocalDateTime dateTime = newTask.getLocalDateTime();
        List<Task> foundTasks = repository.findByLocalDateTime(dateTime);
        if (!foundTasks.isEmpty()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Já existe uma task nesse mesmo horário");
        }
        return repository.save(newTask);
    }

    @PutMapping("/tasks/{id_task}")
    Task replaceTask(@Valid @RequestBody Task newTask, @PathVariable Long id_task){
        return repository.findById(id_task)
                .map(task -> {
                    BeanUtils.copyProperties(newTask, task, "id"); // copia tudo, exceto id
                    return repository.save(task);
                })
                .orElseGet(() -> repository.save(newTask));
    }

    @DeleteMapping("/tasks/{id_task}")
    void deleteTask(@PathVariable Long id_task){
        repository.deleteById(id_task);
    }
}
