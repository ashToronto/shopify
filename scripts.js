$(function() {
    // GET INPUT INFO - ENTRY DATA
    $('#get-button').on('click', function() {
        $.ajax({
            url: '/products',
            contentType: 'application/json',
            success: function(response) {
                var tbodyEl = $('tbody');
                tbodyEl.html('');
                var database = response.products;

                database.forEach(function(product) {
                    tbodyEl.append('\
                        <tr>\
                            <td class="id">' + product.id + '</td>\
                            <td><input type="text" class="name" value="' + product.name + '"></td>\
                            <td><input type="text" class="name" value="' + product.ammount + '"></td>\
                            <td>\
                                <button class="update-button">UPDATE/PUT</button>\
                                <button class="delete-button">DELETE</button>\
                            </td>\
                        </tr>\
                    ');
                });
            }
        });
    });

    // CREATE AN ENTRY - POST
    $('#create-form').on('submit', function(event) {
        event.preventDefault();

        var createInput = $('#create-input');
        var ammount = $('#ammount');
        var total = $('#total')

        $.ajax({
            url: '/products',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ name: createInput.val(), ammount: ammount.val() }),
            success: function(response) {
                console.log(response);
                createInput.val('');
                ammount.val('');

                $('#get-button').click();
            }
        });
    });

    // UPDATE AN ENTRY
    $('table').on('click', '.update-button', function() {
        var rowEl = $(this).closest('tr');
        var id = rowEl.find('.id').text();
        var newName = rowEl.find('.name').val();
        var newAmmount = ('.ammount').val();

        $.ajax({
            url: '/products/' + id,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ newName: newName, newAmmount: newAmmount }),
            success: function(response) {
                console.log(response);
                $('#get-button').click();
            }
        });
    });

    // DELETE AN ENTRY
    $('table').on('click', '.delete-button', function() {
        var rowEl = $(this).closest('tr');
        var id = rowEl.find('.id').text();

        $.ajax({
            url: '/products/' + id,
            method: 'DELETE',
            contentType: 'application/json',
            success: function(response) {
                console.log(response);
                $('#get-button').click();
            }
        });
    });
});
