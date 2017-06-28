/* 
* @requires Vector2, Particle
*/
function ChamberBox(x1, y1, x2, y2) {
    this.apply = function(particle) {
        if (particle.position.x - particle.size < x1 || particle.position.x + particle.size > x2)
            particle.velocity.x = -particle.velocity.x;

        if (particle.position.y - particle.size < y1 || particle.position.y + particle.size > y2)
            particle.velocity.y = -particle.velocity.y;
    };
}
