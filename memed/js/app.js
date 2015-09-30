$(document).ready(function(){

    var hpoint = new THREE.Vector3(-500, 0, 0);
    var lpoint = new THREE.Vector3(0, 0, 0);
    var lvec = hpoint.sub(lpoint);
    lvec.normalize();

    var Mem = function(name, tags, date){
        this.name = name;
        this.date = data;
        this.tags = tags;
    }
    
    var cx, cy = 0; 
    setInterval(function(){
        var windowWidth = $(window).width();
        var windowHeight = $(window).height();
        var lineHeight = windowHeight;

        var centerX = parseInt(windowWidth / 2) - parseInt($("#tags").width() / 2);
        $("#tags").css("left", centerX + "px");

        $(".line").height(lineHeight);

        cx = parseInt(windowWidth / 2);
        cy = parseInt(lineHeight / 2);
        
    }, 1);

    var t = 0;
    var c = 0;
    var r = 0;

    var render = function(){
        var s = 5; 
        var sr = r * s;
        var sc = c * s;
        var o = new THREE.Vector3(100, 0, 0);
        o.applyAxisAngle(
            new THREE.Vector3(0, 1, 0), 
            0.2616);
        o.normalize();
        o.multiplyScalar(sr)

        var down = new THREE.Vector3(0, 1, 0);
        down.multiplyScalar(sc);

        var n = o.add(down);
        var x = parseInt(n.x) + "px";
        var y = parseInt(n.y) + "px";
        var z = parseInt(n.z - 500) + "px";
        
        $("#camera").css("-webkit-transform", 
            "translate3d(" + x + ", " + y + ", " + z + ")");
    }
    render();

    $(window).keypress(function(event) { 

        if ($("#filter").is(":focus")) return;

        var code = event.keyCode;
        var D = 100;
        var F = 102;
        var J = 106;
        var K = 107;
        if (code == D){
            r--;
        }else if (code == F){
            r++;
        }else if (code == J){
            c--;
        }else if (code == K){
            c++;
        }

        render();
    }); 

    var tags = ["josh", "people", "coding", "js", "climbing", "photos"];
    for (var i = 0; i < 100; i++){
        var num = parseInt(Math.random()*tags.length);
        var thisTags = [];
        for (var j = 0; j < num; j++){            
            var tag = tags[parseInt(Math.random()*tags.length)];
            thisTags.push(tag);
        }
        var $figure = $("<figure></figure>");
        var $img = $("<img>");
        $img.attr("src", "http://lorempixel.com/200/200/nature");
        var $caption = $("<figcaption>" + tag + "</figcaption>");
        $figure.append($img);
        $figure.append($caption); 
        $figure.data("tags", thisTags);
        $("#mems").append($figure); 
    }

    var isDragging = false;
    $(document).mousedown(function() {
        lastX = event.pageX;
        lastY = event.pageY;
        isDragging = true;
    })

    $(document).mouseup(function() {
        lastX = event.pageX;
        lastY = event.pageY;
        isDragging = false;
    });

    $('figure').on('dragstart', function(event) { event.preventDefault(); });

    var lastX = 0;
    var lastY = 0;
    $(document).mousemove(function(){
        var currentX = event.pageX;
        var currentY = event.pageY;
        if (isDragging){
            var dx = currentX - lastX;
            var dy = currentY - lastY;
            lastX = currentX;
            lastY = currentY;
            r += dx;
            c += dy;
            render();
        }
    });

    $("#mems figure").mousedown(function(){
        return true;
    });

    $("#filter").keyup(function(e){
        var q = $("#filter").val(); 
        var tagsToFind = q.trim().split(" ");
        
        $("#mems").children().each(function(child){
            var memTags = $(this).data("tags");

            var allMatch = true; 
            for (var i = 0; i < tagsToFind.length; i++){
                var mustExist = tagsToFind[i];

                var foundOne = false;
                for (var j = 0; j < memTags.length; j++){
                    if (memTags[j] == mustExist)
                    {
                        foundOne = true;
                    }
                }

                if (!foundOne){
                    allMatch = false;
                    i = tagsToFind.length;
                }

            }

            if (allMatch){
                $(this).show();
            }else{
                $(this).hide();
            }
        });  
    });

});