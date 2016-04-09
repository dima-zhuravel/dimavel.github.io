'use strict';
/*----------------------------------------------------
AJAX
----------------------------------------------------*/
$(function (){

    var blockList = $('.pockemon__list');

    $.ajax({
        type: 'GET',
        url: 'http://pokeapi.co/api/v1/pokemon/?limit=12',
        success: function(pokemonsLimit){
            $('header, .pockemon, .ability').removeClass('hide');
            $('.wrap_loader').addClass('hide');
            var blockPockemon = $('.pockemon');
            $.each(pokemonsLimit.objects, function(i, item){
                var name = item.name; //Pockemon Name
                var pockemonId = item.pkdx_id; //Pockemons ID 

                var blockCard= $('<div class="pockemon__card" data-id="'+pockemonId+'">'); //Pockemon Card
                var blockName = $('<p class="pockemon__name">'); //Pockemon Name
                var blockWrapimg = $('<div class="pockemon__wrapimg">'); //Block for centering image of pockemon

                /*------------------------
                Block with image
                ------------------------*/
                var imgLink = $('<img class="pockemon__img" src="http://pokeapi.co/media/img/'+pockemonId+'.png" alt="" />');
                var image = $(blockWrapimg).append(imgLink); 

                /*------------------------
                Card with image
                ------------------------*/
                var card = $(blockCard).append(image);

                /*------------------------
                Pockemon name
                ------------------------*/
                $(blockName).append(name);
                $(card).append(blockName);

                var blockType = $('<ul class="pockemon__types">');//Block for the list of abilities

                    $.each(item.types, function(i, talents){ //Loop for abilities
                        var typeItem = $('<li class="pockemon__type pockemon__'+talents.name+'">'); //Single type item
                        var type = $(typeItem).append(talents.name);
                        var typeList = $(blockType).append(type);
                        $(card).append(typeList);
                        $(blockList).append(card);
                    });
            });
            $('.pockemon__card').on('click', function(){
                var dataIdPockemon = $(this).data('id');
                var pockemonUrl = 'http://pokeapi.co/api/v1/pokemon/'+dataIdPockemon+'';
                $.ajax({
                    type: 'GET',
                    url: pockemonUrl,
                    success: function(singlePockemon){
                        $('.ability__card').show();
                        // console.log(singlePockemon);
                        var singleView = $('<div class="singleView">');
                        var blockWrapimg = $('<div class="pockemon__wrapimg">'); //Block for centering image of pockemon
                        var imgLink = $('<img class="pockemon__img" src="http://pokeapi.co/media/img/'+dataIdPockemon+'.png" alt="" />');
                        
                        $(blockWrapimg).append(imgLink);
                        $(singleView).append(blockWrapimg);
                        
                        var blockSingleName = ('<p class="singlePockName">');
                        var singleName = (singlePockemon.name);
                        var isNAme = $(blockSingleName).append(singleName+' #'+dataIdPockemon);
                        $(singleView).append(isNAme);
                        $('.card__single').html(singleView);

                        var ulTypes = $('<ul class="tableTypes">');
                        $.each(singlePockemon.types, function(i, types){
                            var singleTypes = $('<li class="'+types.name+'">'+types.name+'; </li>');
                            $(ulTypes).append(singleTypes);
                            $('.table__type').html(ulTypes);
                        });

                        $('.table__attack').html(singlePockemon.attack);
                        $('.table__defense').html(singlePockemon.defense);
                        $('.table__hp').html(singlePockemon.hp);
                        $('.table__sp_attack').html(singlePockemon.sp_atk);
                        $('.table__sp_defence').html(singlePockemon.sp_def);
                        $('.table__speed').html(singlePockemon.speed);
                        $('.table__weight').html(singlePockemon.weight);
                        
                        var totalMoves = singlePockemon.moves.length;
                        $('.table__total').html(totalMoves);
                    }
                });
            });
        }
    });

    var urlNext = 'http://pokeapi.co/api/v1/pokemon/?limit=12&offset=12';
    $('.btn').on('click', function(e){
    $('.wrap_loader').removeClass('hide');
        $.ajax({
            type: 'GET',
            url: urlNext,
            success: function(nextPokemons){

            $('.wrap_loader').addClass('hide');

            urlNext = 'http://pokeapi.co/'+nextPokemons.meta.next;
            var blockPockemon = $('.pockemon');

            $.each(nextPokemons.objects, function(i, item){
                var name = item.name; //Pockemon Name
                var pockemonId = item.pkdx_id; //Pockemons ID 

                var blockCard= $('<div class="pockemon__card" data-id="'+pockemonId+'">'); //Pockemon Card
                var blockName = $('<p class="pockemon__name">'); //Pockemon Name
                var blockWrapimg = $('<div class="pockemon__wrapimg">'); //Block for centering image of pockemon

                /*------------------------
                Block with image
                ------------------------*/
                var imgLink = $('<img class="pockemon__img" src="http://pokeapi.co/media/img/'+pockemonId+'.png" alt="" />');
                var image = $(blockWrapimg).append(imgLink); 

                /*------------------------
                Card with image
                ------------------------*/
                var card = $(blockCard).append(image);

                /*------------------------
                Pockemon name
                ------------------------*/
                $(blockName).append(name);
                $(card).append(blockName);

                var blockType = $('<ul class="pockemon__types">');//Block for the list of abilities

                    $.each(item.types, function(i, talents){ //Loop for abilities
                        var typeItem = $('<li class="pockemon__type pockemon__'+talents.name+'">'); //Single type item
                        var type = $(typeItem).append(talents.name);
                        var typeList = $(blockType).append(type);
                        $(card).append(typeList);
                        $(blockList).append(card);
                    });
            });
                console.log(nextPokemons);

                $('.pockemon__card').on('click', function(){
                    $('.ability__card').show();
                    var dataIdPockemon = $(this).data('id');
                    var pockemonUrl = 'http://pokeapi.co/api/v1/pokemon/'+dataIdPockemon+'';
                    $.ajax({
                        type: 'GET',
                        url: pockemonUrl,
                        success: function(singlePockemon){
                            console.log(singlePockemon);
                            var singleView = $('<div class="singleView">');
                            var blockWrapimg = $('<div class="pockemon__wrapimg">'); //Block for centering image of pockemon
                            var imgLink = $('<img class="pockemon__img" src="http://pokeapi.co/media/img/'+dataIdPockemon+'.png" alt="" />');
                            
                            $(blockWrapimg).append(imgLink);
                            $(singleView).append(blockWrapimg);
                            
                            var blockSingleName = ('<p class="singlePockName">');
                            var singleName = (singlePockemon.name);
                            var isNAme = $(blockSingleName).append(singleName+' #'+dataIdPockemon);
                            $(singleView).append(isNAme);
                            $('.card__single').html(singleView);

                            var ulTypes = $('<ul class="tableTypes">');
                            $.each(singlePockemon.types, function(i, types){
                                var singleTypes = $('<li class="'+types.name+'">'+types.name+'; </li>');
                                $(ulTypes).append(singleTypes);
                                $('.table__type').html(ulTypes);
                            });

                            $('.table__attack').html(singlePockemon.attack);
                            $('.table__defense').html(singlePockemon.defense);
                            $('.table__hp').html(singlePockemon.hp);
                            $('.table__sp_attack').html(singlePockemon.sp_atk);
                            $('.table__sp_defence').html(singlePockemon.sp_def);
                            $('.table__speed').html(singlePockemon.speed);
                            $('.table__weight').html(singlePockemon.weight);
                            
                            var totalMoves = singlePockemon.moves.length;
                            $('.table__total').html(totalMoves);
                        }
                    });
                });

            }
        });
    });
});