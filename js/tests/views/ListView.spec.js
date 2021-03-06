// Deps
var Backbone = require('backbone'),
    $ = Backbone.$ = require('jquery'),
    i18nHelper = require('../../src/utils/i18n-helper'),
    AvengersCollection = require('../../src/collections/AvengersCollection'),
    ListView = require('../../src/views/ListView.js');

// Load Handlebars helpers file to associate them to Handlebars namespace.
require('../../src/utils/handlebarsHelpers');

function todo() {
    assert(false, "Test implementation pending");
};

function createView() {
    return new ListView({
        collection: new AvengersCollection([
            {
                id: 1,
                slug: 'thor',
                alias: 'Thor',
                gender: 'Male',
                real_name: 'Thor Odinson',
                description: 'As the son of Odin and Gaea, Thor’s strength, endurance and resistance to injury are greater than the vast majority of his superhuman race. He is extremely long-lived (though not completely immune to aging), immune to conventional disease and highly resistant to injury. His flesh and bones are several times denser than a human’s. As Lord of Asgard, Thor possessed the Odinforce, which enabled him to tap into the near-infinite resources of cosmic and mystical energies, enhancing all of his abilities. With the vast magical power of the Odinforce, Thor was even able to dent Captain America’s virtually indestructible shield with Mjolnir.',
                image: 'dist/img/thor.jpg'
            }
        ])
    });
}

describe('The List view', function() {

    var view;

    beforeEach(function() {
        view = createView();
    });

    afterEach(function() {
        view =  null;
    })

    it('should bind a passed-in collection locally', function() {
        expect(view.collection).to.exist;
        expect(view.collection).to.be.instanceof(Backbone.Collection);
        expect(view.collection.length).to.equal(1);
    });

    it('should create a container element', function() {
        expect(view.el).to.exist;
        expect(view.el.tagName.toLowerCase()).to.equal('div');
        expect(view.el.classList.contains('avengers__listContainer')).to.be.true;
    });

    it('should render list items for each model', function() {
        view.render();
        row = view.$el.find('.js-avenger-row:first');

        expect(row).to.be.defined;
        expect(row.attr('data-model-slug')).to.equal('thor');
        expect(row.find('span').text()).to.equal('Thor');
    });

    it('should have a click event for its items', function() {
        expect(view.events).to.exist;
        expect(view.events).to.include.keys('click .js-avenger-row');
        var callbackName = view.events['click .js-avenger-row'];
        expect(view[callbackName]).to.be.a('function');
    });

    describe('when a row is clicked', function() {

        var row;

        beforeEach(function() {
            view.render();
            row = view.$el.find('.js-avenger-row:first');
        });

        it('should trigger a view change event', function(done) {

            Backbone.Events.once('changeToDetailed', function() {
                done();
            });

            row.trigger('click');

        });

        it('should send the correct ID with the event', function(done) {

            Backbone.Events.once('changeToDetailed', function(id) {
                expect(id).to.exist;
                expect(id).to.equal('thor');
                done();
            });

            row.trigger('click');

        });

    });

});
