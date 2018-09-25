### pokedex part 2

- for each route type, create one `app.get` handler.
- in the response to the request, send back only HTML.
- format the HTML to output a nicely formatted page with each pokemon attribute.

### further
- use a `ul` element for each attribute in the pokemon that has more than one thing: i.e., `type`.
- create a page at the root route `/` that displays links to each pokemon's page. (hint: the html is created in a loop)

### further
- if the user requests a pokemon or something that doesn't exist, redirect them back to the root URL.
- add CSS (right now, this has to be in a style tag in the HTML you send back)

### further
Create a route for each of these: `spawn_chance`, `avg_spawns` that will show each pokemon that is more or less than the given number. Example: `/spawn_chance/less/1` will send back a formatted HTML page with a list of every pokemon with a spawn change less than 1.

### further
Create the same routes for: `height`, `weight` and `spawn_time`.
