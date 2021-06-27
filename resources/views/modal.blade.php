<div class="modal fade" id="eventModal" data-backdrop="static" data-keyboard="false" tabindex="-1"
    aria-labelledby="eventModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header bg-primary">
                <h5 class="modal-title" id="eventModalLabel">Event</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <input type="hidden" id="idInput" value="">
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label for="titleInput">Title</label>
                            <input type="text" class="form-control" id="titleInput" value="" onkeyup="writeTitle(this)">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="startInput">Start</label>
                            <input type="datetime-local" class="form-control" id="startInput" value="">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="endInput">End</label>
                            <input type="datetime-local" class="form-control" id="endInput" value="">
                        </div>
                    </div>
                    <div class="col-md-12">
                        <label for="color0" class="bg-primary p-3 rounded" onclick="document.querySelector('.modal-header').className = 'modal-header bg-primary'"></label>
                        <input type="radio" name="color" value="bg-primary" id="color0" class="d-none">
                        <label for="color1" class="bg-success p-3 rounded" onclick="document.querySelector('.modal-header').className = 'modal-header bg-success'"></label>
                        <input type="radio" name="color" value="bg-success" id="color1" class="d-none">
                        <label for="color2" class="bg-warning p-3 rounded" onclick="document.querySelector('.modal-header').className = 'modal-header bg-warning'"></label>
                        <input type="radio" name="color" value="bg-warning" id="color2" class="d-none">
                        <label for="color3" class="bg-info p-3 rounded" onclick="document.querySelector('.modal-header').className = 'modal-header bg-info'"></label>
                        <input type="radio" name="color" value="bg-info" id="color3" class="d-none">
                        <label for="color4" class="bg-danger p-3 rounded" onclick="document.querySelector('.modal-header').className = 'modal-header bg-danger'"></label>
                        <input type="radio" name="color" value="bg-danger" id="color4" class="d-none">
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal" id="deleteButton" onclick="deleteEvent()">Delete</button>
                <button type="button" class="btn btn-success" id="saveButton" onclick="storeEvent()">Save</button>
            </div>
        </div>
    </div>
</div>

<script>
    function writeTitle(e) {
        $('#eventModalLabel').html($(e).val())
    }
</script>
