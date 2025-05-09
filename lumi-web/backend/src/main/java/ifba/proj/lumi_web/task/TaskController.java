package ifba.proj.lumi_web.task;

import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;
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
    Task newTask(@RequestBody Task newTask){
        return repository.save(newTask);
    }

    @PutMapping("/tasks/{id_task}")
    Task replaceTask(@RequestBody Task newTask, @PathVariable Long id_task){
        return repository.findById(id_task)
                .map(task -> {
                   task.setTitle(newTask.getTitle());
                   task.setDescription(newTask.getDescription());
                   task.setDuration(newTask.getDuration());
                   return repository.save(task);
                })
                .orElseGet(() ->{
                    return repository.save(newTask);
                });
    }

    @DeleteMapping("/tasks/{id_task}")
    void deleteTask(@PathVariable Long id_task){
        repository.deleteById(id_task);
    }
}
