package ifba.proj.lumi_web.task;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.Objects;
import java.time.LocalDateTime;
@Entity
@Data // gera getters e setters automaticamente
public class Task {
    private @Id @GeneratedValue Long id_task;

    @NotNull(message = "Titulo obrigatorio")
    @Size(min = 3, max = 100, message = "Titulo deve ter entre 3 e 100 caracteres")
    private String title;

    @NotNull(message = "Descricao obrigatoria")
    @Size(min = 3, max = 100, message = "Titulo deve ter entre 3 e 100 caracteres")
    private String description;

    @NotNull(message = "Duracao obrigatoria")
    @Positive(message = "Duracao deve ser maior que zero")
    private Long duration;

    @NotNull(message = "Data e hora obrigatorios")
    @FutureOrPresent(message = "A data nao pode ter passado")
    private LocalDateTime localDateTime;

    Task(){}

    public Task(String title, String description, Long duration,LocalDateTime localDateTime) {
        this.title = title;
        this.description = description;
        this.duration = duration;
        this.localDateTime = localDateTime;
    }
}
