package ifba.proj.lumi_web;

import ifba.proj.lumi_web.task.Task;
import ifba.proj.lumi_web.task.TaskRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
class LoadDatabase {
    private static final Logger log = LoggerFactory.getLogger(LoadDatabase.class);

    @Bean
    CommandLineRunner initDatabase(TaskRepository repository) {
        return args -> {
            log.info("Preloading " + repository.save(new Task("estudar programacao", "estudo de programacao em java", 60L)));
            log.info("Preloading " + repository.save(new Task("estudar matematica", "revisao de binomio de Newton", 120L)));
            log.info("Preloading " + repository.save(new Task("finalizar tcc", "finalizar SessionApp.tsx", 240L)));
        };
    }
}
