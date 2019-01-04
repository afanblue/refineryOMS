-- select t.name, ctv.name contents from tag t join tank tk on t.id=tk.id join content_type_vw ctv on ctv.code=tk.content_type_code where t.name like 'FOT12%' and t.tag_type_code='TK'

