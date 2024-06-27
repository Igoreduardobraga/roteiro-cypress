describe('template spec', () => {
  it('Verifica se app está abrindo', () => {
    cy.visit('http://127.0.0.1:7001/')
  })

  it('Insere uma tarefa', () => {
    cy.visit('http://127.0.0.1:7001'); 

    cy.get('.new-todo')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('.todo-list li')
      .should('have.length', 1) 
      .first()
      .should('have.text', 'TP2 de Engenharia de Software'); 
  });

  it('Insere e deleta uma tarefa', () => {
    cy.visit('http://127.0.0.1:7001');

    cy.get('.new-todo')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('.todo-list li .destroy')
      .invoke('show')
      .click();

    cy.get('.todo-list li')
      .should('have.length', 0);
  });

  it('Filtra tarefas completas e ativas', () => {
    cy.visit('http://127.0.0.1:7001'); 

    cy.get('.new-todo')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    cy.get('.todo-list li .toggle')
      .first()
      .click();

    cy.contains('Active').click();
    cy.get('.todo-list li')
      .should('have.length', 1)
      .first()
      .should('have.text', 'Prova de ES');

    cy.contains('Completed').click();
    cy.get('.todo-list li')
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES');

    cy.contains('All').click();
    cy.get('.todo-list li')
      .should('have.length', 2);
  });

  //Testes novos

  it('Insere e edita uma tarefa', () => {
    cy.visit('http://127.0.0.1:7001'); 
    cy.get('.new-todo').type('Ler capítulo 8 do livro{enter}')

    cy.get('.todo-list li')
      .should('have.length', 1)

    cy.get('.todo-list li').invoke('show').dblclick();

    cy.get(".edit").clear();

    cy.get('.edit').type('Ler capítulo 9 do livro{enter}')

    cy.get('.todo-list li')
      .should('have.length', 1)
      .first()
      .should('have.text', 'Ler capítulo 9 do livro');

  });

  it('Insere e deleta várias tarefas', () => {
    cy.visit('http://127.0.0.1:7001'); 

    cy.get('.new-todo').type('Comprar leite{enter}')
    .type('Enviar relatório semanal{enter}')
    .type('Fazer exercícios de matemática{enter}')
    .type('Preparar apresentação para a reunião{enter}')
    .type('Organizar documentos{enter}')
    .type('Limpar a garagem{enter}')
    .type('Fazer compra do mês{enter}')
    .type('Agendar consulta médica{enter}')
    .type('Atualizar software do servidor{enter}')
    .type('Revisar o plano de marketing{enter}')
    .type('Assistir a webinar sobre cibersegurança{enter}')
    .type('Preparar jantar para os amigos{enter}')
    .type('Ler emails não lidos{enter}')
    .type('Testar a nova funcionalidade do app{enter}')
    .type('Escrever artigo para o blog{enter}')
    .type('Fazer backup dos dados{enter}')
    .type('Plantar as novas mudas no jardim{enter}')

     cy.get('.todo-list li')
      .should('have.length', 17)

    cy.get('.todo-list li .destroy').each(($btn) => {
        cy.wrap($btn).invoke('show').click({ force: true });
    });

    cy.get('.todo-list li')
      .should('have.length', 0)
  });

  it('Limpar todas as tarefas completas', () => {
    cy.visit('http://127.0.0.1:7001'); 

    cy.get('.new-todo')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}')
      .type('Fazer exercícios de matemática{enter}')
      .type('Preparar apresentação para a reunião{enter}')
      .type('Organizar documentos{enter}')
      .type('Limpar a garagem{enter}')
      .type('Fazer compra do mês{enter}')
      .type('Agendar consulta médica{enter}')
      .type('Atualizar software do servidor{enter}')
      .type('Revisar o plano de marketing{enter}')

    // Marca as cinco tarefas como completas
    cy.get('.todo-list li .toggle').each(($el, index, $list) => {
      if (index < 5) {
        cy.wrap($el).click();
      }
    });

    cy.get('.todo-list li')
      .each(($el, index, $list) => {
        if (index < 5) {
          cy.wrap($el).should('have.class', 'completed');
        }
      });

    cy.get('.todo-list li')
    .should('have.length', 10)

    cy.contains('Clear completed').click();

    cy.get('.todo-list li')
      .should('have.length', 5)

    const tarefasNaoCompletas = [
      'Limpar a garagem',
      'Fazer compra do mês',
      'Agendar consulta médica',
      'Atualizar software do servidor',
      'Revisar o plano de marketing'
    ];

    cy.get('.todo-list li:not(.completed)').each(($el, index) => {
      cy.wrap($el).should('have.text', tarefasNaoCompletas[index]);
    });
  });

  it('Marcar e desmarcar todas as tarefas como completas utilizando a seta lateral', () => {
    cy.visit('http://127.0.0.1:7001'); 

    cy.get('.new-todo')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}')
      .type('Fazer exercícios de matemática{enter}')
      .type('Preparar apresentação para a reunião{enter}')
      .type('Organizar documentos{enter}')
      .type('Limpar a garagem{enter}')
      .type('Fazer compra do mês{enter}')
      .type('Agendar consulta médica{enter}')
      .type('Atualizar software do servidor{enter}')
      .type('Revisar o plano de marketing{enter}')

      cy.get('.toggle-all-label').click();
      cy.get('.toggle-all-label').click();
  });
});