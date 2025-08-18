package ifba.proj.lumi_web.task;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.List;
import java.time.LocalDateTime;

public interface TaskRepository extends JpaRepository<Task,Long> {

    List<Task> findByLocalDateTime(LocalDateTime localDateTime);
}
