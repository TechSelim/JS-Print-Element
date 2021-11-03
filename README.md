# JS-Print-Element
HTML: 
<pre>
<code>
&lt;button id="print"&gt;Print&lt;/button&gt;
&lt;div id="print-body"&gt;
  Content
&lt;/div&gt;
</code>
</pre>

JS
<pre>
<code>
$('#print').click(function(event) {
  $("#print-body").print();
});
</code>
</pre>
