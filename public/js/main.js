        // table data
        function tableData(data) {
            var rows = '';
            var i = 0;
            $.each(data, function(key, value) {
                value.id
                rows = rows + '<tr>';
                rows = rows + '<td>' + ++i + '</td>';
                rows = rows + '<td>' + value.title + '</td>';
                rows = rows + '<td>' + value.details + '</td>';
                rows = rows + '<td>';
                if (value.status == true) {
                    rows = rows + '<span class="badge rounded-pill text-bg-success"><i class="fa fa-check"></i> Completed</span>';
                } else {
                    rows = rows + '<span class="badge rounded-pill text-bg-danger"><i class="fa fa-exclamation-circle"></i> Incomplete</span>';
                }
                rows = rows + '</td>';
                rows = rows + '<td>';
                rows = rows +
                    '<a class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#editModal" data-id="' +
                    value.id + '" id="editRow"><i class="fa fa-edit"></i></a> <a class="btn btn-danger btn-sm" id="deleteRow" data-id="' +
                    value.id + '"><i class="fa fa-trash"></i></a>';
                rows = rows + '</td>';
                rows = rows + '</tr>';
            });
            $("#todoTable").html(rows);
        }

        // get todos data
        function getAllData() {
            axios.get('/api/todo')
                .then(response => {
                    tableData(response.data)
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                })
        }
        getAllData();

        // Todo data store
        $(document).ready(function() {
            $("#add_from").submit(function(e) {
                e.preventDefault()
                let data = {
                    title: $('#title').val(),
                    details: $('#details').val(),
                }
                axios.post('/api/todo/store', data)
                    .then(response => {
                        getAllData()
                        $('#addModal').modal('hide');
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Your work has been saved',
                        });
                        $('#title').val('')
                        $('#details').val('')
                    })
            })
        });
        // data edit
        $('body').on('click', '#editRow', function(e) {
            e.preventDefault();
            let id = $(this).data('id')
            // let edit = url + '/employee/edit/' + id
            axios.get('/api/todo/edit/' + id)
                .then(response => {
                    $('#e_id').val(response.data.id);
                    $('#e_title').val(response.data.title);
                    $('#e_details').val(response.data.details);
                    $('#e_status').val(response.data.status);
                })
                .catch(error => {
                    console.log(error)
                })
        });
        // Todo data update
        $(document).ready(function() {
            $("#update_from").submit(function(e) {
                e.preventDefault()
                let id = $('#e_id').val();
                let data = {
                    id: id,
                    title: $('#e_title').val(),
                    details: $('#e_details').val(),
                    status: $('#e_status').val(),
                }
                axios.put('/api/todo/update/'+id, data)
                    .then(response => {
                        getAllData()
                        $('#editModal').modal('hide');
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Your work has been updated',
                        });
                    })
            })
        });
        // data delete
        $('body').on('click', '#deleteRow', function(e) {
            e.preventDefault();
            let id = $(this).data('id')
            // let del = url + '/employee/destroy/' + id
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.get('/api/todo/destroy/' + id)
                        .then(response => {
                            getAllData();
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        })
                        .catch(error => {
                            console.log(error)
                        })
                }
            })
        })
