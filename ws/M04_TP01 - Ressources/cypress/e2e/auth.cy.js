describe('Testing auth', () => {
    it('J\ai un message d\'erreur si je me trompe de mot de passe', () => {
        cy.visit('/login');
        cy.get('input[name="email"]').type('admin@express-brains.local');
        cy.get('input[name="password"]').type('wrongpassword');
        cy.get("button[type='submit']").click();
        cy.contains('Email ou mot de passe incorrect');
    });
    it('En tant qu\'admin, je peux me connecter à l\'application', () => {
        cy.visit('/login');
        cy.get('input[name="email"]').type('admin@express-brains.local');
        cy.get('input[name="password"]').type('admin');
        cy.get("button[type='submit']").click();
        cy.contains('Bonjour admin@express-brains.local');
        cy.get('a[href="/logout"]')
        cy.get('a[href="/users"]');
    });
    it('En tant qu\'utilisateur, je ne peux pas voir le lien "Uilisateurs" dans le menu', () => {
        cy.visit('/login');
        cy.get('input[name="email"]').type('user@express-brains.local');
        cy.get('input[name="password"]').type('user');
        cy.get("button[type='submit']").click();
        cy.contains('Bonjour user@express-brains.local');
        cy.get('a[href="/logout"]')
        cy.get('a[href="/users"]').should('not.exist');
    });
});
