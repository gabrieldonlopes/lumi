package ifba.proj.lumi_web.task;

public class TaskNotFoundException extends RuntimeException {
    public TaskNotFoundException(Long id_task) {
        super("Could not find task "+id_task);
    }
}
