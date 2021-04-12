/**
 * @fileoverview Requires test attributes on textfields.
 * @author David Calhoun
 */
const {
    errors,
    defaultRuleSchema,
    defaults
} = require('../constants');

const {
    getError,
    shouldBypass
} = require('../utils');

module.exports = {
    meta: {
        docs: {
            description: 'Requires test attributes on textfields.',
            category: 'Possible Errors',
            recommended: true,
            url: ''
        },
        fixable: null,
        schema: defaultRuleSchema
    },

    create: function(context) {
        const options = context.options[1] || {};
        const testAttribute = options.testAttribute || defaults.testAttribute;

        return {
            JSXOpeningElement: (node) => {
                const bypass = shouldBypass(node, options, [
                    {
                        test: ({ elementType }) => elementType !== 'TextField'
                    }
                ]);

                if (bypass) return;

                context.report({
                    node,
                    message: getError(errors.input.message, testAttribute)
                });
            }
        };
    }
};
