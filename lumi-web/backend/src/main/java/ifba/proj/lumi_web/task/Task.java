package ifba.proj.lumi_web.task;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

import java.util.Objects;

@Entity
public class Task {
    private @Id @GeneratedValue Long id_task;
    private String title;
    private String description;
    private Long duration;

    Task(){}

    public Task(String title, String description, Long duration) {
        this.title = title;
        this.description = description;
        this.duration = duration;
    }

    public Long getId_task(){
        return id_task;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Long getDuration() {
        return duration;
    }

    public void setDuration(Long duration) {
        this.duration = duration;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Task task = (Task) o;
        return Objects.equals(getId_task(), task.getId_task()) && Objects.equals(getTitle(), task.getTitle()) && Objects.equals(getDescription(), task.getDescription())
                && Objects.equals(getDuration(), task.getDuration());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId_task(), getTitle(), getDescription(), getDuration());
    }
}
