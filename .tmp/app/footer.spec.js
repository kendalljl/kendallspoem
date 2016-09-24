/// <reference path="../../typings/index.d.ts" />
describe('footer component', function () {
    beforeEach(angular.mock.module('app', function ($provide) {
        $provide.factory('fountainFooter', function () {
            return {
                templateUrl: 'app/footer.html'
            };
        });
    }));
    it('should render \'FountainJS team\'', inject(function ($rootScope, $compile) {
        var element = $compile('<fountain-footer></fountain-footer>')($rootScope);
        $rootScope.$digest();
        var footer = element.find('a');
        expect(footer.html().trim()).toEqual('FountainJS team');
    }));
});
