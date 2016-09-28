(function($) {

    /**
     * Copyright 2012, Digital Fusion
     * Licensed under the MIT license.
     * http://teamdf.com/jquery-plugins/license/
     *
     * @author Sam Sehnert
     * @desc A small plugin that checks whether elements are within
     *     the user visible viewport of a web browser.
     *     only accounts for vertical position, not horizontal.
     */

    $.fn.visible = function(partial) {

        var $t = $(this),
            $w = $(window),
            viewTop = $w.scrollTop(),
            viewBottom = viewTop + $w.height(),
            _top = $t.offset().top,
            _bottom = _top + $t.height(),
            compareTop = partial === true ? _bottom : _top,
            compareBottom = partial === true ? _top : _bottom;

        return ((compareBottom <= viewBottom) && (compareTop >= viewTop));

    };



    // FUNZIONI PER IL GENERATORE DEL VISORE //
    $(document).ready(function() {

        function checkColor(element) {
            if ($(element).hasClass('colored_bg--business')) {
                return ('black');
            }
            if ($(element).hasClass('colored_bg--mobile')) {
                return ('lightBlue');
            }
            if ($(element).hasClass('colored_bg--infostrada')) {
                return ('blue');
            }
            if ($(element).hasClass('colored_bg--white')) {
                return ('white');
            }
            if ($(element).hasClass('colored_bg--orange')) {
                return ('orange');
            }
        }

        function checkBg(element) {
            if ($(element).hasClass('colored_bg--business')) {
                return ('business');
            }
            if ($(element).hasClass('colored_bg--mobile')) {
                return ('mobile');
            }
            if ($(element).hasClass('colored_bg--infostrada')) {
                return ('infostrada');
            }
            if ($(element).hasClass('colored_bg--white')) {
                return ('white');
            }
            if ($(element).hasClass('colored_bg--orange')) {
                return ('orange');
            }
        }

        function removeAllBg(element) {
            $(element).removeClass('color--blue');
            $(element).removeClass('color--white');
            $(element).removeClass('color--lightBlue');
            $(element).removeClass('color--black');
            $(element).removeClass('color--orange');
        }

        function removeAllBack(element) {
            $(element).removeClass('colored_bg--orange');
            $(element).removeClass('colored_bg--mobile');
            $(element).removeClass('colored_bg--infostrada');
            $(element).removeClass('colored_bg--business');
            $(element).removeClass('colored_bg--white');
        }

        var text = $('.standard_block__title').text();
        $("input[name='titoloPrincipale']").val(text);

        text = $('.standard_block__subtitle').text();
        $("input[name='sottotitoloVisore']").val(text);

        text = $('.standard_block__text').text();
        $("input[name='descrizioneVisore']").val(text);

        text = $('.price_discounted').text();
        $("input[name='scontoVisore']").val(text);

        text = $('.main_price').text();
        $("input[name='prezzoVisore']").val(text);

        text = $('.recurrent_priceRow__recurrency').text();
        $("input[name='ricorrenzaVisore']").val(text);

        //TITOLO PRINCIPALE VISORE
        $('#titoloPrincipale').click(function() {
            elemento = '.standard_block__title';
            text = $(this).parents('.elemento_creatore').find('.base__input').val();
            color = checkColor($(this).parents('.elemento_creatore').find('.filter-option.pull-left .changeColor'));
            newColor = 'color--' + color;
            $(elemento).text(text);
            removeAllBg(elemento);
            $(elemento).addClass(newColor);
        });
        //TITOLO SECONDARIO VISORE
        $('#sottotitoloVisore').click(function() {
            elemento = '.standard_block__subtitle';
            text = $(this).parents('.elemento_creatore').find('.base__input').val();
            color = checkColor($(this).parents('.elemento_creatore').find('.filter-option.pull-left .changeColor'));
            newColor = 'color--' + color;
            $(elemento).text(text);
            removeAllBg(elemento);
            $(elemento).addClass(newColor);
        });
        //DESCRIZIONE VISORE
        $('#descrizioneVisore').click(function() {
            elemento = '.standard_block__text';
            text = $(this).parents('.elemento_creatore').find('.base__input').val();
            color = checkColor($(this).parents('.elemento_creatore').find('.filter-option.pull-left .changeColor'));
            newColor = 'color--' + color;
            $(elemento).text(text);
            removeAllBg(elemento);
            $(elemento).addClass(newColor);
        });
        //SCONTO VISORE
        $('#scontoVisore').click(function() {
            elemento = '.price_discounted';
            text = $(this).parents('.elemento_creatore').find('.base__input').val();
            color = checkColor($(this).parents('.elemento_creatore').find('.filter-option.pull-left .changeColor'));
            newColor = 'color--' + color;
            $(elemento).text(text);
            removeAllBg(elemento);
            $(elemento).addClass(newColor);
        });
        //PREZZO VISORE
        $('#prezzoVisore').click(function() {
            elemento = '.main_price';
            text = $(this).parents('.elemento_creatore').find('.base__input').val();
            color = checkColor($(this).parents('.elemento_creatore').find('.filter-option.pull-left .changeColor'));
            newColor = 'color--' + color;
            $(elemento).text(text);
            removeAllBg(elemento);
            $(elemento).addClass(newColor);
        });
        //RICORRENZA VISORE
        $('#ricorrenzaVisore').click(function() {
            elemento = '.recurrent_priceRow__recurrency';
            text = $(this).parents('.elemento_creatore').find('.base__input').val();
            color = checkColor($(this).parents('.elemento_creatore').find('.filter-option.pull-left .changeColor'));
            newColor = 'color--' + color;
            $(elemento).text(text);
            removeAllBg(elemento);
            $(elemento).addClass(newColor);
        });
        //COLORE SFONDO VISORE
        $('#coloreSfondo').click(function() {
            elemento = '.standard_block__coloredBg';
            color = checkBg($(this).parents('.elemento_creatore').find('.filter-option.pull-left .changeColor'));
            console.log(color);
            newColor = 'colored_bg--' + color;
            removeAllBack(elemento);
            $(elemento).addClass(newColor);
        });

        //cambia pulsanti
        $('#cambiaPulsanti').click(function() {
            $('.standard_block__singleButton').toggle();
            $('.standard_block__doubleButton').toggle();
        });

        //uniforma SFONDO VISORE
        $('#uniformaSfondo').click(function() {
            elemento = '.standard_block__overflowing';
            color = checkBg($(this).parents('.elemento_creatore').find('.filter-option.pull-left .changeColor'));
            newColor = 'colored_bg--' + color;
            console.log(newColor);
            removeAllBack(elemento);
            $(elemento).addClass(newColor);
        });
        $('#invertiVisore').click(function() {
            $('.standard_block__mainContainer').toggleClass('invertedDisplay');
        });
        // BOLLI
        $('#bolloDigital').click(function() {
            $('.standard_block__sticker__container').append('<img class="sticker_single " src="/img/bolli/bollo_digital_style.png"/>');
        });
        $('#bolloGigaFree').click(function() {
            $('.standard_block__sticker__container').append('<img class="sticker_single " src="/img/bolli/bollo_giga_free.png"/>');
        });
        $('#bolloGiga').click(function() {
            $('.standard_block__sticker__container').append('<img class="sticker_single " src="/img/bolli/bollo_giga.png"/>');
        });
        $('#bolloNoTax').click(function() {
            $('.standard_block__sticker__container').append('<img class="sticker_single " src="/img/bolli/bollo_notax.png"/>');
        });
        //RIMUOVI BOLLI
        $('#rimuoviBolli').click(function() {
            $('.sticker_single:last').remove();
        });

        //CANCELLA TESTO
        $('.cancella').click(function() {
            $(this).parents('.elemento_creatore').find('.base__input').val('');
            $(this).parents('.elemento_creatore').find('.confirm').trigger("click");
        });

        // BUNDLE
        $('#aggiungiBundle').click(function() {
            number = $(this).parents('.elemento_creatore').find('.base__input.numero_bundle').val();
            description = $(this).parents('.elemento_creatore').find('.base__input.descrizione_bundle').val();
            color = checkColor($(this).parents('.elemento_creatore').find('.filter-option.pull-left .changeColor'));
            newColor = 'color--' + color;
            $('.bundle_orange__container').append('<div class="bundle_orange bundle_orange__divider--right"><div class="bundle_orange__number">' + number + '</div><div class="bundle_orange__title"><div class="description">' + description + '</div></div></div>');
        });
        //RIMUOVI BUNDLE
        $('#rimuoviBundle').click(function() {
            $('.bundle_orange:last').remove();
        });
        //RIDUCI BUNDLE
        $('#riduciBundle').click(function() {
            $('.standard_block__mainContainer').toggleClass('bundle_small');
        });
        //NASCONDI/MOSTRA SHARE
        $('#share').click(function() {
            $('.container_reviews').toggle();
        });

        //CHANGE COLORS   
        $('.selectpicker').on('hidden.bs.select', function(e) {
            $(this).parents('.elemento_creatore').find('.confirm').trigger("click");
        });

        //NASCONDI CMS
        $('#nascondiCms').click(function() {
            $('.container_cms').slideToggle();
        });
        //rimuovi ultimo blocco

        $('#rimuoviUltimoBlocco').click(function() {
            $('.showcase_bundle_device__single:first').remove();
        });
        $('#rimuoviTuttiBundle').click(function() {
            $('.showcase_bundle_device__single').each(function() {
                $(this).remove();
            });
            $('.showcase_bundle_device__showMore').show();
        });
        // aggiungi blocco 1
        $('#addBlock1').click(function() {
            $('.all_device_bundle_container')
                .append(' <div class="showcase_bundle_device__single showcase_bundle_device__single--generic col-xs-12 col-sm-6 col-md-4 col-lg-4 ">' +
                    '       <img src="/img/products/smartphone_example.png" class="showcase_bundle_device__single--generic__image">' +
                    '       <div class="showcase_bundle_device__single--generic--title">' +
                    '         Samsung Galaxy s6    ' +
                    '       </div>                  ' +
                    '       <div class="showcase_bundle_device__single--generic--description">' +
                    '         Funzionalit&agrave; eccezionale, un design colorato e un ampio display da 5.' +
                    '       </div>' +
                    '       <div class="showcase_bundle_device__select">   ' +
                    '         <select class="base__select selectpicker" title="Grigio" data-size="6"> ' +
                    '           <option>Grigio</option>' +
                    '           <option>Bianco</option>' +
                    '           <option>Nero</option>' +
                    '           <option>Giallo a pois rosa</option>' +
                    '         </select> ' +
                    '       </div>          ' +
                    '       <div class="showcase_bundle_device__select showcase_bundle_device__select--second">' +
                    '         <select class="base__select selectpicker" title="32 GB" data-size="6">' +
                    '           <option>32 GB</option>' +
                    '           <option>64 GB</option>' +
                    '           <option>100 GB</option>' +
                    '           <option>999 GB</option>' +
                    '         </select> ' +
                    '       </div>     ' +
                    '       <div class="clear"></div>                        ' +
                    '       <div class="showcase_bundle_device__single--generic--mainPrice align_left">' +
                    '         <span class="mainPrice">19</span>' +
                    '         <span class="recurrency">&euro; al mese per 30 mesi e </span>' +
                    '         <span class="mainPrice upfront">79</span>' +
                    '         <span class="recurrency upfront">&euro; di anticipo.</span>' +
                    '       </div>      ' +
                    '         <a href="#" class="button button--noMargin">' +
                    '           aggiungi al carrello ' +
                    '         </a>  ' +
                    '       </div>');
            $('.selectpicker').selectpicker();
        });
        // aggiungi blocco 2
        $('#addBlock2').click(function() {
            $('.all_device_bundle_container')
              .append(' <div class="showcase_bundle_device__single showcase_bundle_device__single--vAbbina col-xs-12 col-sm-6 col-md-4 col-lg-4 ">' +
                '         <img src="/img/products/smartphone_example.png" class="showcase_bundle_device__single--generic__image">' +
                '         <div class="showcase_bundle_device__single--vAbbina--title">' +
                '           Modem     ' +
                '         </div>                  ' +
                '         <div class="showcase_bundle_device__single--vAbbina--description">' +
                '           A partire da <span class="showcase_bundle_device__single--vAbbina--description--price">99,95</span><span class="currency">&euro;</span><br> con offerta in' +
                '           <div class="showcase_bundle_device__single--vAbbina--promo">promo offerta <br>adsl</div>' +
                '         </div>   ' +
                '         <div class="clear"></div>                      ' +
                '         <a href="#" class="button button--noMargin">' +
                '           abbina a un piano ' +
                '         </a>                                                               ' +
                '         <div class="showcase_bundle_device__single--vAbbina--totalPrice">' +
                '           <span class="showcase_bundle_device__single--vAbbina--totalPrice--description">Unica soluzione</span>' +
                '           <span class="showcase_bundle_device__single--vAbbina--totalPrice--price">899,90</span><span class="showcase_bundle_device__single--vAbbina--totalPrice--description currency">&euro;</span> ' +
                '         </div>   ' +
                '         <a href="#" class="button--ghost">' +
                '           compra subito' +
                '         </a>              ' +
                '       </div>  ');
        });
        // aggiungi blocco 3
        $('#addBlock3').click(function() {
            $('.all_device_bundle_container').append('<div class="showcase_bundle_device__single showcase_bundle_device__single--vPack col-xs-12 col-sm-6 col-md-4 col-lg-4 ">' +
                '  <div class="showcase_bundle_device__single--vPack--mainTitle">' +
                '     Smartphone <br> Best price  ' +
                '</div>                  ' +
                '<div class="showcase_bundle_device__single--vPack--description">' +
                'Gli smartphone pi&ugrave; richiesti solo per te!' +
                '</div>   ' +
                ' <div class="showcase_bundle_device__single--vPack--title">' +
                '    Samsung Galaxy 1s' +
                '</div>                       ' +
                '<div class="clear"></div>  ' +
                ' <img src="/img/products/smartphone_example.png" class="showcase_bundle_device__single--vPack__image">' +
                ' <div class="showcase_bundle_device__single--vPack--totalPrice">' +
                ' <div class="showcase_bundle_device__single--vPack--totalPrice--barred">' +
                ' <span class="price">159,90</span><span class="currency">&euro;</span></div>' +
                ' <div class="showcase_bundle_device__single--vPack--totalPrice--price">' +
                ' <span class="price">139,39</span><span class="currency">&euro;</span></div>                   ' +
                ' <div class="showcase_bundle_device__single--vPack--totalPrice--description">sconto 20%</div>' +
                '</div>                                         ' +
                ' <a href="#" class="button button--noMargin">' +
                '   scopri' +
                ' </a>    ' +

                '</div>  ');
        });
        // aggiungi blocco 4
        $('#addBlock4').click(function() {
            $('.all_device_bundle_container').append('<div class="showcase_bundle_device__single showcase_bundle_device__single--vPackOffer col-xs-12 col-sm-6 col-md-4 col-lg-4 "> ' +
                '      <div class="showcase_bundle_device__single--vPackOffer--mainTitle">' +
                '         Smartphone <br> Box  ' +
                '      </div>                  ' +
                '       <div class="showcase_bundle_device__single--vPackOffer--description">' +
                '          1 GIGA di Internet <br>per navigare in piena <br>libert&agrave;!' +
                '      </div>   ' +
                '       <div class="showcase_bundle_device__single--vPackOffer--description">' +
                '          Gli smartphone pi&ugrave;<br> richiesti a 1&euro;' +
                '      </div>                                                 ' +
                '      <div class="clear"></div>  ' +
                '       <img src="/img/products/smartphone_example.png" class="showcase_bundle_device__single--vPackOffer__image">' +
                '                                 ' +
                '       <a href="#" class="button button--noMargin">' +
                '         scopri ' +
                '      </a>        ' +
                '                    ' +
                '</div>    ');
        });
        // aggiungi card1
        $('#addCard1').click(function() {
            $('.all_device_bundle_container').append('<div class="showcase_bundle_device__single showcase_bundle_device__single--vCard col-xs-12 col-sm-6 col-md-4 col-lg-4 ">  ' +
                '                 <div class="showcase_bundle_device__single--vCard--mainTitle">' +
                '                     Musica MMS' +
                '                 </div>   ' +
                '                  <img src="/img/cards/card1_example.jpg" class="showcase_bundle_device__single--vCard__image">                                                       ' +
                '                  <div class="showcase_bundle_device__single--vCard--description">' +
                '                     Tutto quanto c&apos;è da sapere sul mondo della musica italiana e internazionale.' +
                '                 </div>                                        ' +
                '                 <div class="clear"></div>  ' +
                '                 <div class="showcase_bundle_device__single--vCard--totalPrice">' +
                '                   <div class="showcase_bundle_device__single--vCard--totalPrice--price">' +
                '                     <span class="price">70</span><span class="currency">cent</span>' +
                '                   </div>                                 ' +
                '                   <div class="showcase_bundle_device__single--vCard--totalPrice--description">per ogni MMS</div>' +
                '                </div>                                                                    ' +
                '                <a href="#" class="button button--noMargin">' +
                '                   scopri' +
                '                </a>       ' +
                '        </div>    ');
        });

        // aggiungi card2
        $('#addCard2').click(function() {
            $('.all_device_bundle_container').append('<div class="showcase_bundle_device__single showcase_bundle_device__single--vCardOffer col-xs-12 col-sm-6 col-md-4 col-lg-4 ">' +
                '              <div class="showcase_bundle_device__single--vCardOffer__bgImage__container">' +
                '                 <img src="/img/cards/background_card.jpg" class="showcase_bundle_device__single--vCardOffer__bgImage">   ' +
                '              </div>' +
                '              <div class="showcase_bundle_device__single--vCardOffer__textContainer">' +
                '                  <div class="showcase_bundle_device__single--vCardOffer--mainTitle">' +
                '                      Scegli Wind ' +
                '                  </div>   ' +
                '                 <div class="showcase_bundle_device__single--vCardOffer--mainTitle--big">' +
                '                      Promo 50 GIGA ' +
                '                  </div>              ' +
                '                   <div class="showcase_bundle_device__single--vCardOffer--description">' +
                '                      Scegli lo smartphone<br>che preferisci.<br>Subito per te <b>50 GIGA.</b>' +
                '                  </div>    ' +
                '                 <div class="clear"></div>                                              ' +
                '             </div>                                                                  ' +
                '              <a href="#" class="button button--noMargin">' +
                '                scopri' +
                '             </a>                                                                                                                     ' +
                '    </div>');
        });

        // aggiungi card3
        $('#addCard3').click(function() {
            $('.all_device_bundle_container').append('<div class="showcase_bundle_device__single showcase_bundle_device__single--vCardOffer--vPrice col-xs-12 col-sm-6 col-md-4 col-lg-4 ">' +
                '           <div class="showcase_bundle_device__single--vCardOffer--vPrice__bgImage__container">' +
                '             <img src="/img/cards/background_card2.jpg" class="showcase_bundle_device__single--vCardOffer--vPrice__bgImage">   ' +
                '          </div>' +
                '          <div class="showcase_bundle_device__single--vCardOffer--vPrice__textContainer">' +
                '              <div class="showcase_bundle_device__single--vCardOffer--vPrice--mainTitle">' +
                '                  All inclusive <br> Summer edition' +
                '              </div>                                 ' +
                '              <div class="showcase_bundle_device__single--vCardOffer--vPrice--description">' +
                '                 <b>1000</b> Minuti veri' +
                '             </div> ' +
                '              <div class="showcase_bundle_device__single--vCardOffer--vPrice--description">' +
                '                 <b>1000</b> SMS' +
                '             </div>  ' +
                '              <div class="showcase_bundle_device__single--vCardOffer--vPrice--description">' +
                '                 <b>4</b> GIGA' +
                '             </div>                                                                                             ' +
                '             <div class="clear"></div> ' +
                '            <div class="showcase_bundle_device__single--vCardOffer--vPrice--totalPrice">' +
                '              <div class="showcase_bundle_device__single--vCardOffer--vPrice--totalPrice--price">' +
                '                <span class="price">12</span><span class="currency">&euro;</span>' +
                '              </div>                                 ' +
                '              <div class="showcase_bundle_device__single--vCardOffer--vPrice--totalPrice--description">L&apos;offerta si rinnova ogni 4 settimane</div>' +
                '           </div>                                              ' +
                '         </div>                                                           ' +
                '          <a href="#" class="button button--noMargin">' +
                '            scopri' +
                '         </a>                                                    ' +
                ' </div>          ');
        });
    });

})(jQuery);
