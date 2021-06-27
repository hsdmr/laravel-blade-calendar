<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Laravel Blade Calendar</title>
    <link rel="stylesheet" href="{{ asset('bootstrap-4.6.0/css/bootstrap.min.css') }}">
    <link rel="stylesheet" href="{{ asset('fullcalendar/main.min.css') }}">
    <link rel="stylesheet" href="{{ asset('toastr/toastr.min.css') }}">
    <link rel="stylesheet" href="{{ asset('app/style.css') }}">
    <script>
        var APP_URL = {!! json_encode(url('/')) !!}
    </script>
</head>

<body>

    <div id="calendar"></div>

    <script src="{{ asset('app/jquery.js') }}"></script>
    <script src="{{ asset('bootstrap-4.6.0/js/bootstrap.bundle.min.js') }}"></script>
    <script src="{{ asset('fullcalendar/main.min.js') }}"></script>
    <script src="{{ asset('toastr/toastr.min.js') }}"></script>
    <script src="{{ asset('app/script.js') }}"></script>
    @include('modal')
    <script>
        renderCalendar()
    </script>
</body>

</html>
