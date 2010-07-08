/**
  * Utility methods for CSS generation and manipulation
  *
  * Copyright (c) 2010 Ankit Ahuja
  * Dual licensed under GPL and MIT licenses.
 **/


var CSSUtils = {
    
    /*  e.g. of rules object used as input / output:
    
    rules = {
        'a.someclass': { 
                'color': '#fff',
                'font-size': '12px'
            }
        }
    
    */

    // generate formatted CSS for rules
    crunchCSS: function(rules, setImportant) {
        var css = "";

        for(var selector in rules)
        {
            css += selector + "{" + "\n";
            for(var property in rules[selector])
                css += "\t" + this.getCSSDeclaration(property, rules[selector][property], setImportant) + "\n";

            css += "}" + "\n\n";
        }
        
        return css;
    },
    
    getCSSDeclaration: function(property, value, setImportant) {
        if(setImportant)
            return property + ": " + value + " !important;";
        else
            return property + ": " + value + ";";
    },
    
    injectCSS: function(css, title) {
        var d = document.documentElement;
        var style = document.createElement('style');
        style.type = "text/css";
        style.title = title;
        style.innerText = css;
        d.insertBefore(style, null);
    },
    
    parseBlockCSS: function(css) {
        var rule = {};
        var declarations = css.split(';');
        declarations.pop();
        var len = declarations.length;
        for(var i=0; i<len; i++)
        {
            var pair = declarations[i].split(':');
            var property = $.trim( pair[0] );
            var value = $.trim( pair[1] );
            if( property != "" && value != "" )
                rule[ property ] = value;
        }
        return rule;
    },
    
    parseCSS: function(css) {
        var rules = {};
        css = this.removeComments( css );
        var blocks = css.split( '}' );
        blocks.pop();
        var len = blocks.length;
        for(var i=0; i<len; i++)
        {
            var pair = blocks[i].split( '{' );
            rules[ $.trim( pair[0] ) ] = this.parseBlockCSS( pair[1] );
        }
        console.log( rules );
        return rules;
    },
    
    // from http://www.senocular.com/pub/javascript/CSS_parse.js
    removeComments: function(css){
        console.log(css.replace(/\/\*(\r|\n|.)*\*\//g,""));
	    return css.replace(/\/\*(\r|\n|.)*\*\//g,"");
    }
}

