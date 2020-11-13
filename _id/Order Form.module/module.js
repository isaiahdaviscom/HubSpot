// To keep our code clean and modular, all custom functionality will be contained inside a single object literal called "multiFilter".
var multiFilter = {
  // Declare any variables we will need as properties of the object
  $filterGroups: null,
  $filterUi: null,
  $reset: null,
  $changeLayout : $('#ChangeLayout'),
  groups: [],
  outputArray: [],
  outputString: "",
  init: function() {
    // The "init" method will run on document ready and cache any jQuery objects we will need.
    // As a best practice, in each method we will asign "this" to the variable "self" 
    // so that it remains scope-agnostic. We will use it to refer to the parent "checkboxFilter" 
    // object so that we can share methods and properties between all parts of the object.
    var self = this;
    self.$filterUi = $("#Filters");
    self.$filterGroups = $(".filter-group");
    self.$reset = $("#Reset");
    self.$container = $("#Container");
    self.$filterGroups.each(function() {
      self.groups.push({
        $inputs: $(this).find("input"),
        active: [],
        tracker: false
      });
    });
    self.bindHandlers();
  },
  bindHandlers: function() {
    // The "bindHandlers" method will listen for whenever a form value changes.
    var self = this,
      typingDelay = 300,
      typingTimeout = -1,
      resetTimer = function() {
        clearTimeout(typingTimeout);
        typingTimeout = setTimeout(function() {
          self.parseFilters();
        }, typingDelay);
      };
    self.$filterGroups.filter(".checkboxes").on("change", function() {
      self.parseFilters();
    });
    self.$filterGroups.filter(".search").on("keyup change", resetTimer);
    self.$reset.on("click", function(e) {
      e.preventDefault();
      self.$filterUi[0].reset();
      self.$filterUi.find('input[type="text"]').val("");
      self.parseFilters();
    });
  },
  parseFilters: function() {
    // The parseFilters method checks which filters are active in each group:
    var self = this;
    // loop through each filter group and add active filters to arrays
    for (var i = 0, group; (group = self.groups[i]); i++) {
      group.active = []; // reset arrays
      group.$inputs.each(function() {
        var searchTerm = "",
          $input = $(this),
          minimumLength = 3;
        if ($input.is(":checked")) {
          group.active.push(this.value);
        }
        if ($input.is('[type="text"]') && this.value.length >= minimumLength) {
          searchTerm = this.value
            .trim()
            .toLowerCase()
            .replace(" ", "-");
          group.active[0] = '[class*="' + searchTerm + '"]';
        }
      });
      group.active.length && (group.tracker = 0);
    }
    self.concatenate();
  },
  concatenate: function() {
    // The "concatenate" method will crawl through each group, concatenating filters as desired:
    var self = this,
      cache = "",
      crawled = false,
      checkTrackers = function() {
        var done = 0;
        for (var i = 0, group; (group = self.groups[i]); i++) {
          group.tracker === false && done++;
        }
        return done < self.groups.length;
      },
      crawl = function() {
        for (var i = 0, group; (group = self.groups[i]); i++) {
          group.active[group.tracker] && (cache += group.active[group.tracker]);
          if (i === self.groups.length - 1) {
            self.outputArray.push(cache);
            cache = "";
            updateTrackers();
          }
        }
      },
      updateTrackers = function() {
        for (var i = self.groups.length - 1; i > -1; i--) {
          var group = self.groups[i];
          if (group.active[group.tracker + 1]) {
            group.tracker++;
            break;
          } else if (i > 0) {
            group.tracker && (group.tracker = 0);
          } else {
            crawled = true;
          }
        }
      };
    self.outputArray = []; // reset output array
    do {
      crawl();
    } while (!crawled && checkTrackers());
    self.outputString = self.outputArray.join();
    // If the output string is empty, show all rather than none:
    !self.outputString.length && (self.outputString = "all");
    console.log(self.outputString);
    // ^ we can check the console here to take a look at the filter string that is produced
    // Send the output string to MixItUp via the 'filter' method:
    if (self.$container.mixItUp("isLoaded")) {
      self.$container.mixItUp("filter", self.outputString);
    }
  }
};
// On document ready, initialise our code.
$(function() {
  // Initialize multiFilter code
  multiFilter.init();
  // Instantiate MixItUp
  $("#Container").mixItUp({
    controls: {
      enable: false // we won't be needing these
    },
    animation: {
      easing: "cubic-bezier(0.86, 0, 0.07, 1)",
      queueLimit: 3,
      duration: 600
    }
  });
});

$changeLayout.on('click', function(){
    
    // If the current layout is a list, change to grid:
    
    if(layout == 'list'){
      layout = 'grid';
      
      $changeLayout.text('List'); // Update the button text
      
      $container.mixItUp('changeLayout', {
        containerClass: layout // change the container class to "grid"
      });
      
    // Else if the current layout is a grid, change to list:  
    
    } else {
      layout = 'list';
      
      $changeLayout.text('Grid'); // Update the button text
      
      $container.mixItUp('changeLayout', {
        containerClass: layout // Change the container class to 'list'
      });
    }
});