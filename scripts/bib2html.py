import yaml 
'''
import bibtexparser
with open('../pub/ziw.bib') as bibtex_file:
  bib_database = bibtexparser.load(bibtex_file)

print(bib_database.entries)

with open('../pub/bib.yaml', 'w') as of:
  yaml.safe_dump(bib_database.entries, of, default_flow_style=False)
'''

with open('../pub/bib.yaml') as of:
  bibs = yaml.load(of)

by_year = {}
for e in bibs:
  year = int(e['year'])
  if year in by_year:
    by_year[year].append(e)
  else:
    by_year[year] = [e]

f = open('../_pages/publications.md', 'w')
#import pdb; pdb.set_trace()
f.write('--- \n\
title: "Publications" \n\
layout: single_noauthor \n\
permalink: /publications/ \n\
author_profile: true \n\
toc: true \n\
toc_label: "Publication List" \n\
toc_sticky: true \n\
---\n')
for i in sorted(by_year.keys(), reverse = True):
  f.write('## ' + str(i) + '\n')
  for p in by_year[i]:
    if 'project' not in p:
      if 'url' in p:
        tmp = p['url']
      else:
        tmp = ''
    else:
      tmp = p['project']
    p['author'].replace('Zi Wang', '<strong>Zi Wang</strong>')
    f.write('\n \
<div class="publication">          \n \
  <link rel="stylesheet" href="/assets/css/my.css">         \n \
  <div class="img"><a href="{}"><img class="img_responsive" src="{}"></a></div>         \n \
  <div class="text">         \n \
    <div class="title"><a name="{}" href="{}">{}</a></div>         \n \
    <div class="authors">{}         \n \
    </div>         \n \
    <div>         \n \
      <em>{}, {}</em> \n <br> \n'.format( tmp, p['img'], p['ID'], tmp, p['title'], p['author'], p['booktitle'], p['year'] )) 
    if 'other' in p:
      f.write('\n {} \n <br> \n'.format(p['other']))
    if 'project' in p:
      f.write(' \n \
      <a class="btn btn--primary btn--small" href="{}">Project page</a>         \n \
        '.format(p['project']))
    if 'url' in p:
      f.write(' \n \
      <a class="btn btn--success btn--small" href="{}">PDF</a>         \n \
        '.format(p['url']))
    if 'code' in p:
      f.write(' \n \
      <a class="btn btn--warning btn--small" href="{}">Code</a>         \n \
        '.format(p['code']))
    if 'slides' in p:
      f.write('\n \
      <a class="btn btn--info btn--small" href="{}">Slides</a>         \n \
      '.format(p['slides']))
    if 'poster' in p:
      f.write('\n \
      <a class="btn btn--danger btn--small" href="{}">Poster</a>         \n \
      '.format(p['poster']))
    f.write('\n \
    </div>         \n \
  </div>         \n \
</div> \n <br>\n')

