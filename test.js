import assert from 'node:assert/strict'
import test from 'node:test'
import {remark} from 'remark'
import {toVFile} from 'to-vfile'
import {lintRule} from 'unified-lint-rule'
import lint from './index.js'
import noHeadingPunctuation from 'remark-lint-no-heading-punctuation'
import noMultipleToplevelHeadings from 'remark-lint-no-multiple-toplevel-headings'
import noUndefinedReferences from 'remark-lint-no-undefined-references'
import finalNewline from 'remark-lint-final-newline'
test('core', async () => {
  const doc = [
    '# A heading',
    '',
    '# Another main heading.',
    '',
    '<!--lint ignore-->',
    '',
    '# Another main heading.'
  ].join('\n')

  let file = await remark()
    .use(noHeadingPunctuation)
    .use(noMultipleToplevelHeadings)
    .use(lint)
    .process(toVFile({path: 'virtual.md', value: doc}))

  assert.deepEqual(
    asStrings(file.messages),
    [
      'virtual.md:3:1-3:24: Don’t add a trailing `.` to headings',
      'virtual.md:3:1-3:24: Don’t use multiple top level headings (1:1)'
    ],
    'should support `remark-lint` last'
  )

  file = await remark()
    .use(lint)
    .use(noHeadingPunctuation)
    .use(noMultipleToplevelHeadings)
    .process(toVFile({path: 'virtual.md', value: doc}))

  assert.deepEqual(
    asStrings(file.messages),
    [
      'virtual.md:3:1-3:24: Don’t add a trailing `.` to headings',
      'virtual.md:3:1-3:24: Don’t use multiple top level headings (1:1)'
    ],
    'should support `remark-lint` first'
  )

  file = await remark().use(lint).process('.')

  assert.deepEqual(asStrings(file.messages), [], 'should support no rules')

  file = await remark().use(finalNewline).process('')

  assert.deepEqual(
    asStrings(file.messages),
    [],
    'should support successful rules'
  )

  file = await remark().use(finalNewline, [2]).process('.')

  assert.deepEqual(
    file.messages.map((d) => JSON.parse(JSON.stringify(d))),
    [
      {
        name: '1:1',
        message: 'Missing newline character at end of file',
        reason: 'Missing newline character at end of file',
        line: null,
        column: null,
        source: 'remark-lint',
        ruleId: 'final-newline',
        url: 'https://github.com/remarkjs/remark-lint/tree/main/packages/remark-lint-final-newline#readme',
        position: {
          start: {line: null, column: null},
          end: {line: null, column: null}
        },
        fatal: true
      }
    ],
    'should support a list with a severity'
  )

  file = await remark().use(finalNewline, true).process('.')

  assert.deepEqual(
    asStrings(file.messages),
    ['1:1: Missing newline character at end of file'],
    'should support a boolean (`true`)'
  )

  file = await remark().use(finalNewline, false).process('.')

  assert.deepEqual(
    asStrings(file.messages),
    [],
    'should support a boolean (`false`)'
  )

  file = await remark().use(finalNewline, [true]).process('.')

  assert.deepEqual(
    asStrings(file.messages),
    ['1:1: Missing newline character at end of file'],
    'should support a list with a boolean severity (true, for on)'
  )

  file = await remark().use(finalNewline, [false]).process('.')

  assert.deepEqual(
    asStrings(file.messages),
    [],
    'should support a list with boolean severity (false, for off)'
  )

  file = await remark().use(finalNewline, ['error']).process('.')

  assert.deepEqual(
    file.messages.map((d) => JSON.parse(JSON.stringify(d))),
    [
      {
        name: '1:1',
        message: 'Missing newline character at end of file',
        reason: 'Missing newline character at end of file',
        line: null,
        column: null,
        source: 'remark-lint',
        ruleId: 'final-newline',
        url: 'https://github.com/remarkjs/remark-lint/tree/main/packages/remark-lint-final-newline#readme',
        position: {
          start: {line: null, column: null},
          end: {line: null, column: null}
        },
        fatal: true
      }
    ],
    'should support a list with string severity (`error`)'
  )

  file = await remark().use(finalNewline, ['on']).process('.')

  assert.deepEqual(
    file.messages.map((d) => JSON.parse(JSON.stringify(d))),
    [
      {
        name: '1:1',
        message: 'Missing newline character at end of file',
        reason: 'Missing newline character at end of file',
        line: null,
        column: null,
        source: 'remark-lint',
        ruleId: 'final-newline',
        url: 'https://github.com/remarkjs/remark-lint/tree/main/packages/remark-lint-final-newline#readme',
        position: {
          start: {line: null, column: null},
          end: {line: null, column: null}
        },
        fatal: false
      }
    ],
    'should support a list with string severity (`on`)'
  )

  file = await remark().use(finalNewline, ['warn']).process('.')

  assert.deepEqual(
    file.messages.map((d) => JSON.parse(JSON.stringify(d))),
    [
      {
        name: '1:1',
        message: 'Missing newline character at end of file',
        reason: 'Missing newline character at end of file',
        line: null,
        column: null,
        source: 'remark-lint',
        ruleId: 'final-newline',
        url: 'https://github.com/remarkjs/remark-lint/tree/main/packages/remark-lint-final-newline#readme',
        position: {
          start: {line: null, column: null},
          end: {line: null, column: null}
        },
        fatal: false
      }
    ],
    'should support a list with string severity (`warn`)'
  )

  file = await remark().use(finalNewline, ['off']).process('.')

  assert.deepEqual(
    asStrings(file.messages),
    [],
    'should support a list with string severity (`off`)'
  )

  assert.throws(
    () => {
      remark().use(finalNewline, [3]).freeze()
    },
    /^Error: Incorrect severity `3` for `final-newline`, expected 0, 1, or 2$/,
    'should fail on incorrect severities (too high)'
  )

  assert.throws(
    () => {
      remark().use(finalNewline, [-1]).freeze()
    },
    /^Error: Incorrect severity `-1` for `final-newline`, expected 0, 1, or 2$/,
    'should fail on incorrect severities (too low)'
  )

  file = await remark()
    .use(noUndefinedReferences, {allow: [/^b\./i]})
    .process(
      toVFile({
        path: 'virtual.md',
        value: ['[foo][b.c]', '', '[bar][b]'].join('\n')
      })
    )

  assert.deepEqual(
    asStrings(file.messages),
    ['virtual.md:3:1-3:9: Found reference to undefined definition'],
    'no-undefined-references allow option should work with native regex'
  )

  file = await remark()
    .use(
      lintRule('test:rule', (tree, file) => {
        file.message('Test message')
      }),
      ['warn']
    )
    .process('.')

  assert.deepEqual(
    file.messages.map((d) => JSON.parse(JSON.stringify(d))),
    [
      {
        name: '1:1',
        message: 'Test message',
        reason: 'Test message',
        line: null,
        column: null,
        source: 'test',
        ruleId: 'rule',
        position: {
          start: {line: null, column: null},
          end: {line: null, column: null}
        },
        fatal: false
      }
    ],
    'should support string meta'
  )
})


function asStrings(messages){return messages.map(String)}
