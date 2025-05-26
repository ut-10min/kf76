$(function() {
  var template = $('#template').html();
  Mustache.parse(template);
  var rendered = Mustache.render(template, {talks: data});
  $('.article-headline').html(rendered);
});