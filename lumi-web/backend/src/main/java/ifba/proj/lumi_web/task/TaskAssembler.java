package ifba.proj.lumi_web.task;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.RepresentationModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Component
public class TaskAssembler implements RepresentationModelAssembler<Task, EntityModel<Task>> {
    public EntityModel<Task> toModel(Task task) {
        return EntityModel.of(task,
                linkTo(methodOn(TaskController.class).all()).withRel("task")
                );
    }
}