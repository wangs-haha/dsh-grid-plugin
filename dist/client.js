window.__ModuleLoader__.load({
  id: '@local/dsh-grid',
  factory(require) {
    const module = { exports: {} };
    const exports = module.exports;
"use strict";var ot=Object.defineProperty;var fn=Object.getOwnPropertyDescriptor;var hn=Object.getOwnPropertyNames;var bn=Object.prototype.hasOwnProperty;var yn=(t,e)=>{for(var n in e)ot(t,n,{get:e[n],enumerable:!0})},wn=(t,e,n,a)=>{if(e&&typeof e=="object"||typeof e=="function")for(let l of hn(e))!bn.call(t,l)&&l!==n&&ot(t,l,{get:()=>e[l],enumerable:!(a=fn(e,l))||a.enumerable});return t};var xn=t=>wn(ot({},"__esModule",{value:!0}),t);var Kn={};yn(Kn,{default:()=>On});module.exports=xn(Kn);var kn={meta:{title:"Grid",description:"Database workbench: connections with groups, colours and TLS modes, a schema browser, an editable data grid, a SQL console with completion, and saved queries \u2014 plus read-only database context for the agent."},panel:"Grid",connections:"Connections",workspaces:"Workspaces",noWorkspaces:"No workspace is registered in this profile yet.",databases:"Databases",newConnection:"New connection",newQuery:"New query",tables:"Tables",views:"Views",functions:"Functions",users:"Users",queries:"Queries",overview:"Overview",connect:"Connect",disconnect:"Disconnect",test:"Test",edit:"Edit",delete:"Delete",refresh:"Refresh",save:"Save",cancel:"Cancel",close:"Close",confirm:"Confirm",apply:"Apply",clear:"Clear",search:"Search\u2026",loading:"Loading\u2026",error:"Error",name:"Name",type:"Type",comment:"Comment",rows:"Rows",estimatedTotal:"The engine estimated this row count; Refresh asks for an exact count.",size:"Size",total:"Total",selectConnection:"Select a connection on the left to begin.",selectDatabase:"Select a database to list its objects.",emptyTables:"No tables or views in this database.",emptyTable:"This table is empty.",emptyResult:"The query returned no rows.",emptyObjects:"Nothing here yet.",data:"Data",structure:"Structure",columns:"Columns",indexes:"Indexes",ddl:"DDL",noIndexes:"No indexes.",nullable:"Nullable",default:"Default",primaryKey:"PK",insertRow:"Insert row",editRow:"Edit row",rowSaved:"Row saved",rowInserted:"Row inserted",insertRowFailed:"The row could not be inserted with its defaults.",deleteRow:"Delete row",confirmDelete:"Delete this row?",confirmDeleteConnection:"Delete this connection? Its saved password is removed too.",confirmDeleteKey:"Delete this key?",noPrimaryKey:"This table has no primary key, so rows cannot be located safely. Editing is disabled.",cellSaved:"Saved",deleted:"Deleted",saved:"Saved",copied:"Copied",page:"Page {page} of {pages}",pageSize:"Rows per page",prev:"Previous",next:"Next",selection:"Selection {n}",sum:"Sum",avg:"Avg",count:"Count",exportCsv:"Export CSV",exportJson:"Export JSON",exportInsert:"Export INSERT statements",exportMarkdown:"Export Markdown table",exportAs:"Export",importCsv:"Import CSV",importDone:"Imported {n} row(s)",importEmpty:"That file has no rows.",importNoColumns:"Open the table first so its column names are known.",importUnknownColumns:"The file has columns this table does not: {cols}",importFailed:"Imported {n} row(s), then stopped: {error}",exportTruncated:"Export limited to {n} rows",filter:"Filter",filterBuilder:"Filter builder",rawWhere:"Raw WHERE",addCondition:"Add condition",matchAll:"Match all",matchAny:"Match any",columnChooser:"Columns",showAll:"Show all",resetWidths:"Reset widths",run:"Run",cancelQuery:"Cancel",queryCancelled:"Cancelled",cancelUnsupported:"This engine cannot cancel a running statement.",runHint:"Ctrl/Cmd + Enter to run",explain:"Explain",beautify:"Beautify",history:"History",noHistory:"No queries yet.",result:"Result {n}",statementCount:"{n} statement(s)",queryOk:"{n} row(s) in {ms} ms",resultTruncated:"The result was capped: only the first 2 000 rows are shown.",queryFailed:"Failed after {ms} ms",affected:"{n} row(s) affected",noStatements:"Nothing to run.",completionHint:"Ctrl + Space for completion",readOnlyHint:"Read-only statements only",redisKeys:"Keys",redisPattern:"Pattern",redisType:"Type",scanMore:"Scan more",ttl:"TTL",noTtl:"no expiry",keyValue:"Value",command:"Command",commandHint:"e.g. GET user:1",reply:"Reply",deleteKey:"Delete key",newKey:"New key",setTtl:"Set TTL",rename:"Rename",editValue:"Edit value",saveQuery:"Save query",queryName:"Query name",querySaved:"Query saved",noQueries:"No saved queries yet. Save one from the SQL console, or ask the agent to.",openInEditor:"Open in editor",runQuery:"Run",source:"Source",bindProject:"Bind to this project",unbindProject:"Unbind project",projectBound:"This conversation can read {name} ({database}) without asking.",projectUnbound:"Not bound to this workspace. The agent has to ask which connection to use.",readOnlyForAgent:"Agent access is read-only",agentHint:"The agent can list, inspect and query these connections with grid_* tools, and save queries for you.",functionKind:"Function",procedureKind:"Procedure",returnType:"Returns",language:"Language",definition:"Definition",noRoutines:"No functions or procedures.",accountName:"User",accountHost:"Host",accountPlugin:"Plugin",accountLocked:"Locked",accountPrivileged:"Privileged",noAccounts:"No accounts are visible to this connection.",driverMissing:"The {engine} driver is not installed. Run `pnpm add {pkg}` in the plugin directory.",engineUnavailable:"Unavailable",testOk:"Connection works \xB7 {version} \xB7 {ms} ms",testFailed:"Connection failed: {error}",passwordKeep:"Leave blank to keep the saved password",engine:"Engine",host:"Host",port:"Port",user:"User",password:"Password",database:"Database",schema:"Schema",file:"Database file",redisDb:"Database index",color:"Environment colour",identity:"Identity",group:"Group",sslDisable:"TLS off",sslRequire:"TLS, certificate not verified",sslVerifyCa:"TLS, verify certificate chain",sslVerifyFull:"TLS, verify certificate and host name",connectionLost:"Connection lost \u2014 reconnect failed.",bannerTools:"The agent can inspect and query these connections.",writesEnabled:"Writes enabled for the agent",writesDisabled:"Read-only for the agent",unsaved:"Unsaved",copyName:"Copy name",openInQuery:"Open in query",tablesCount:"{n} table(s)",viewsCount:"{n} view(s)",routinesCount:"{n} routine(s)",server:"Server",updatedAt:"Updated",version:"Version",boundProject:"Project",noGroups:"Ungrouped"},Nn={meta:{title:"Grid \u6570\u636E\u5E93",description:"\u6570\u636E\u5E93\u5DE5\u4F5C\u53F0\uFF1A\u8FDE\u63A5\uFF08\u5206\u7EC4+\u73AF\u5883\u8272\uFF09\u3001\u5E93\u8868\u6D4F\u89C8\u3001\u53EF\u7F16\u8F91\u6570\u636E\u7F51\u683C\u3001\u5E26\u8865\u5168\u7684 SQL \u63A7\u5236\u53F0\u3001\u67E5\u8BE2\u4FDD\u5B58\u4E0E\u5907\u4EFD\uFF0C\u5E76\u5411 Agent \u63D0\u4F9B\u53EA\u8BFB\u5E93\u4E0A\u4E0B\u6587\u3002"},panel:"\u6570\u636E\u5E93",connections:"\u8FDE\u63A5",workspaces:"\u5DE5\u4F5C\u533A",noWorkspaces:"\u8FD9\u4E2A profile \u91CC\u8FD8\u6CA1\u6709\u6CE8\u518C\u5DE5\u4F5C\u533A\u3002",databases:"\u6570\u636E\u5E93",newConnection:"\u65B0\u5EFA\u8FDE\u63A5",newQuery:"\u65B0\u5EFA\u67E5\u8BE2",tables:"\u8868",views:"\u89C6\u56FE",functions:"\u51FD\u6570",users:"\u7528\u6237",queries:"\u67E5\u8BE2",overview:"\u6982\u89C8",connect:"\u8FDE\u63A5",disconnect:"\u65AD\u5F00",test:"\u6D4B\u8BD5",edit:"\u7F16\u8F91",delete:"\u5220\u9664",refresh:"\u5237\u65B0",save:"\u4FDD\u5B58",cancel:"\u53D6\u6D88",close:"\u5173\u95ED",confirm:"\u786E\u5B9A",apply:"\u5E94\u7528",clear:"\u6E05\u7A7A",search:"\u641C\u7D22\u2026",loading:"\u52A0\u8F7D\u4E2D\u2026",error:"\u9519\u8BEF",name:"\u540D\u79F0",type:"\u7C7B\u578B",comment:"\u6CE8\u91CA",rows:"\u884C\u6570",estimatedTotal:"\u8BE5\u884C\u6570\u6765\u81EA\u5F15\u64CE\u4F30\u7B97\uFF1B\u70B9\u5237\u65B0\u53EF\u83B7\u53D6\u7CBE\u786E\u503C\u3002",size:"\u5927\u5C0F",total:"\u5408\u8BA1",selectConnection:"\u5728\u5DE6\u4FA7\u9009\u62E9\u4E00\u4E2A\u8FDE\u63A5\u5F00\u59CB\u3002",selectDatabase:"\u9009\u62E9\u4E00\u4E2A\u6570\u636E\u5E93\u6765\u5217\u51FA\u5B83\u7684\u5BF9\u8C61\u3002",emptyTables:"\u8FD9\u4E2A\u6570\u636E\u5E93\u91CC\u6CA1\u6709\u8868\u6216\u89C6\u56FE\u3002",emptyTable:"\u8FD9\u5F20\u8868\u8FD8\u6CA1\u6709\u6570\u636E\u3002",emptyResult:"\u67E5\u8BE2\u6CA1\u6709\u8FD4\u56DE\u4EFB\u4F55\u884C\u3002",emptyObjects:"\u8FD9\u91CC\u8FD8\u6CA1\u6709\u5185\u5BB9\u3002",data:"\u6570\u636E",structure:"\u7ED3\u6784",columns:"\u5B57\u6BB5",indexes:"\u7D22\u5F15",ddl:"DDL",noIndexes:"\u6CA1\u6709\u7D22\u5F15\u3002",nullable:"\u53EF\u7A7A",default:"\u9ED8\u8BA4\u503C",primaryKey:"\u4E3B\u952E",insertRow:"\u63D2\u5165\u884C",editRow:"\u7F16\u8F91\u884C",rowSaved:"\u884C\u5DF2\u4FDD\u5B58",rowInserted:"\u5DF2\u63D2\u5165\u4E00\u884C",insertRowFailed:"\u65E0\u6CD5\u7528\u9ED8\u8BA4\u503C\u63D2\u5165\u65B0\u884C\u3002",deleteRow:"\u5220\u9664\u884C",confirmDelete:"\u786E\u5B9A\u5220\u9664\u8FD9\u4E00\u884C\uFF1F",confirmDeleteConnection:"\u786E\u5B9A\u5220\u9664\u8FD9\u4E2A\u8FDE\u63A5\uFF1F\u4FDD\u5B58\u7684\u5BC6\u7801\u4E5F\u4F1A\u4E00\u5E76\u5220\u9664\u3002",confirmDeleteKey:"\u786E\u5B9A\u5220\u9664\u8FD9\u4E2A\u952E\uFF1F",noPrimaryKey:"\u8BE5\u8868\u6CA1\u6709\u4E3B\u952E\uFF0C\u65E0\u6CD5\u5B89\u5168\u5B9A\u4F4D\u884C\uFF0C\u7F16\u8F91\u5DF2\u7981\u7528\u3002",cellSaved:"\u5DF2\u4FDD\u5B58",deleted:"\u5DF2\u5220\u9664",saved:"\u5DF2\u4FDD\u5B58",copied:"\u5DF2\u590D\u5236",page:"\u7B2C {page} / {pages} \u9875",pageSize:"\u6BCF\u9875\u884C\u6570",prev:"\u4E0A\u4E00\u9875",next:"\u4E0B\u4E00\u9875",selection:"\u9009\u533A {n}",sum:"\u5408\u8BA1",avg:"\u5E73\u5747",count:"\u8BA1\u6570",exportCsv:"\u5BFC\u51FA CSV",exportJson:"\u5BFC\u51FA JSON",exportInsert:"\u5BFC\u51FA INSERT \u8BED\u53E5",exportMarkdown:"\u5BFC\u51FA Markdown \u8868\u683C",exportAs:"\u5BFC\u51FA",importCsv:"\u5BFC\u5165 CSV",importDone:"\u5DF2\u5BFC\u5165 {n} \u884C",importEmpty:"\u8FD9\u4E2A\u6587\u4EF6\u6CA1\u6709\u6570\u636E\u884C\u3002",importNoColumns:"\u8BF7\u5148\u6253\u5F00\u8BE5\u8868\uFF0C\u4EE5\u4FBF\u77E5\u9053\u5217\u540D\u3002",importUnknownColumns:"\u6587\u4EF6\u91CC\u6709\u672C\u8868\u4E0D\u5B58\u5728\u7684\u5217\uFF1A{cols}",importFailed:"\u5DF2\u5BFC\u5165 {n} \u884C\uFF0C\u968F\u540E\u4E2D\u65AD\uFF1A{error}",exportTruncated:"\u5BFC\u51FA\u4E0A\u9650\u4E3A {n} \u884C",filter:"\u7B5B\u9009",filterBuilder:"\u7B5B\u9009\u6784\u5EFA\u5668",rawWhere:"\u539F\u59CB WHERE",addCondition:"\u6DFB\u52A0\u6761\u4EF6",matchAll:"\u5168\u90E8\u6EE1\u8DB3",matchAny:"\u4EFB\u4E00\u6EE1\u8DB3",columnChooser:"\u5B57\u6BB5\u663E\u793A",showAll:"\u5168\u90E8\u663E\u793A",resetWidths:"\u91CD\u7F6E\u5217\u5BBD",run:"\u6267\u884C",cancelQuery:"\u53D6\u6D88\u6267\u884C",queryCancelled:"\u5DF2\u53D6\u6D88",cancelUnsupported:"\u8BE5\u5F15\u64CE\u65E0\u6CD5\u53D6\u6D88\u6B63\u5728\u6267\u884C\u7684\u8BED\u53E5\u3002",runHint:"Ctrl/Cmd + Enter \u6267\u884C",explain:"\u89E3\u91CA",beautify:"\u7F8E\u5316",history:"\u5386\u53F2",noHistory:"\u8FD8\u6CA1\u6709\u6267\u884C\u8FC7\u67E5\u8BE2\u3002",result:"\u7ED3\u679C {n}",statementCount:"{n} \u6761\u8BED\u53E5",queryOk:"{n} \u884C\uFF0C\u8017\u65F6 {ms} \u6BEB\u79D2",resultTruncated:"\u7ED3\u679C\u5DF2\u622A\u65AD\uFF1A\u53EA\u663E\u793A\u524D 2 000 \u884C\u3002",queryFailed:"\u5931\u8D25\uFF0C\u8017\u65F6 {ms} \u6BEB\u79D2",affected:"\u5F71\u54CD {n} \u884C",noStatements:"\u6CA1\u6709\u53EF\u6267\u884C\u7684\u5185\u5BB9\u3002",completionHint:"Ctrl + Space \u5524\u8D77\u8865\u5168",readOnlyHint:"\u4EC5\u53EA\u8BFB\u8BED\u53E5",redisKeys:"\u952E",redisPattern:"\u5339\u914D\u6A21\u5F0F",redisType:"\u7C7B\u578B",scanMore:"\u7EE7\u7EED\u626B\u63CF",ttl:"\u5269\u4F59\u65F6\u95F4",noTtl:"\u6C38\u4E0D\u8FC7\u671F",keyValue:"\u503C",command:"\u547D\u4EE4",commandHint:"\u4F8B\u5982 GET user:1",reply:"\u8FD4\u56DE",deleteKey:"\u5220\u9664\u952E",newKey:"\u65B0\u5EFA\u952E",setTtl:"\u8BBE\u7F6E TTL",rename:"\u91CD\u547D\u540D",editValue:"\u7F16\u8F91\u503C",saveQuery:"\u4FDD\u5B58\u67E5\u8BE2",queryName:"\u67E5\u8BE2\u540D\u79F0",querySaved:"\u67E5\u8BE2\u5DF2\u4FDD\u5B58",noQueries:"\u8FD8\u6CA1\u6709\u4FDD\u5B58\u7684\u67E5\u8BE2\u3002\u53EF\u4EE5\u5728 SQL \u63A7\u5236\u53F0\u91CC\u4FDD\u5B58\uFF0C\u4E5F\u53EF\u4EE5\u8BA9 Agent \u5E2E\u4F60\u4FDD\u5B58\u3002",openInEditor:"\u5728\u7F16\u8F91\u5668\u4E2D\u6253\u5F00",runQuery:"\u6267\u884C",source:"\u6765\u6E90",bindProject:"\u7ED1\u5B9A\u5230\u5F53\u524D\u9879\u76EE",unbindProject:"\u89E3\u9664\u9879\u76EE\u7ED1\u5B9A",projectBound:"\u672C\u6B21\u5BF9\u8BDD\u53EF\u4EE5\u76F4\u63A5\u8BFB\u53D6 {name}\uFF08{database}\uFF09\uFF0C\u65E0\u9700\u53CD\u590D\u786E\u8BA4\u3002",projectUnbound:"\u5C1A\u672A\u7ED1\u5B9A\u5230\u5F53\u524D\u5DE5\u4F5C\u533A\uFF0CAgent \u9700\u8981\u5148\u8BE2\u95EE\u4F7F\u7528\u54EA\u4E2A\u8FDE\u63A5\u3002",readOnlyForAgent:"Agent \u8BBF\u95EE\u4E3A\u53EA\u8BFB",agentHint:"Agent \u53EF\u4EE5\u901A\u8FC7 grid_* \u5DE5\u5177\u5217\u51FA\u3001\u68C0\u67E5\u3001\u67E5\u8BE2\u8FD9\u4E9B\u8FDE\u63A5\uFF0C\u4E5F\u80FD\u66FF\u4F60\u4FDD\u5B58\u67E5\u8BE2\u3002",functionKind:"\u51FD\u6570",procedureKind:"\u5B58\u50A8\u8FC7\u7A0B",returnType:"\u8FD4\u56DE\u7C7B\u578B",language:"\u8BED\u8A00",definition:"\u5B9A\u4E49",noRoutines:"\u6CA1\u6709\u51FD\u6570\u6216\u5B58\u50A8\u8FC7\u7A0B\u3002",accountName:"\u7528\u6237",accountHost:"\u4E3B\u673A",accountPlugin:"\u8BA4\u8BC1\u63D2\u4EF6",accountLocked:"\u5DF2\u9501\u5B9A",accountPrivileged:"\u7279\u6743",noAccounts:"\u8BE5\u8FDE\u63A5\u770B\u4E0D\u5230\u7528\u6237\u5217\u8868\u3002",driverMissing:"\u672A\u5B89\u88C5 {engine} \u9A71\u52A8\uFF0C\u8BF7\u5728\u63D2\u4EF6\u76EE\u5F55\u6267\u884C `pnpm add {pkg}`\u3002",engineUnavailable:"\u4E0D\u53EF\u7528",testOk:"\u8FDE\u63A5\u6210\u529F \xB7 {version} \xB7 {ms} \u6BEB\u79D2",testFailed:"\u8FDE\u63A5\u5931\u8D25\uFF1A{error}",passwordKeep:"\u7559\u7A7A\u8868\u793A\u4FDD\u7559\u5DF2\u4FDD\u5B58\u7684\u5BC6\u7801",engine:"\u5F15\u64CE",host:"\u4E3B\u673A",port:"\u7AEF\u53E3",user:"\u7528\u6237\u540D",password:"\u5BC6\u7801",database:"\u6570\u636E\u5E93",schema:"Schema",file:"\u6570\u636E\u5E93\u6587\u4EF6",redisDb:"\u5E93\u5E8F\u53F7",color:"\u73AF\u5883\u8272",identity:"\u6807\u8BC6",group:"\u5206\u7EC4",sslDisable:"\u5173\u95ED TLS",sslRequire:"TLS\uFF0C\u4E0D\u6821\u9A8C\u8BC1\u4E66",sslVerifyCa:"TLS\uFF0C\u6821\u9A8C\u8BC1\u4E66\u94FE",sslVerifyFull:"TLS\uFF0C\u6821\u9A8C\u8BC1\u4E66\u4E0E\u4E3B\u673A\u540D",connectionLost:"\u8FDE\u63A5\u5DF2\u65AD\u5F00\uFF0C\u91CD\u8FDE\u5931\u8D25\u3002",bannerTools:"Agent \u53EF\u4EE5\u68C0\u67E5\u5E76\u67E5\u8BE2\u8FD9\u4E9B\u8FDE\u63A5\u3002",writesEnabled:"Agent \u53EF\u5199",writesDisabled:"Agent \u53EA\u8BFB",unsaved:"\u672A\u4FDD\u5B58",copyName:"\u590D\u5236\u540D\u79F0",openInQuery:"\u5728\u67E5\u8BE2\u4E2D\u6253\u5F00",tablesCount:"{n} \u5F20\u8868",viewsCount:"{n} \u4E2A\u89C6\u56FE",routinesCount:"{n} \u4E2A\u4F8B\u7A0B",server:"\u670D\u52A1\u5668",updatedAt:"\u66F4\u65B0\u65F6\u95F4",version:"\u7248\u672C",boundProject:"\u9879\u76EE",noGroups:"\u672A\u5206\u7EC4"},Ct={en:kn,zh:Nn};var Se=require("react");var dt=new Set("select from where group by order having limit offset join inner left right full outer cross on as and or not in is null like ilike between exists case when then else end union all distinct insert into values update set delete create table view index alter add drop truncate primary key foreign references unique default constraint cascade returning with recursive asc desc explain analyze show describe use begin commit rollback transaction if temporary materialized over partition window rows range current row unbounded preceding following fetch next only for share nowait".split(/\s+/)),lt=new Set("count sum avg min max coalesce nullif cast convert round floor ceil abs length lower upper trim ltrim rtrim substr substring replace concat concat_ws now current_timestamp current_date current_time date_trunc extract date_part to_char to_date row_number rank dense_rank ntile lag lead first_value last_value json_extract array_agg string_agg group_concat ifnull greatest least random uuid gen_random_uuid".split(/\s+/)),St=["SELECT","FROM","WHERE","GROUP BY","ORDER BY","HAVING","LIMIT","OFFSET","UNION ALL","UNION","INSERT INTO","VALUES","UPDATE","SET","DELETE FROM","RETURNING","LEFT JOIN","RIGHT JOIN","INNER JOIN","FULL JOIN","JOIN"];function ct(t){let e=String(t??""),n=[],a=0,l=(i,d)=>{if(!d)return;let u=n[n.length-1];u&&u.type===i?u.value+=d:n.push({type:i,value:d})};for(;a<e.length;){let i=e[a],d=e.slice(a);if(i==="-"&&e[a+1]==="-"){let u=e.indexOf(`
`,a),v=u===-1?e.length:u;l("comment",e.slice(a,v)),a=v;continue}if(i==="/"&&e[a+1]==="*"){let u=e.indexOf("*/",a+2),v=u===-1?e.length:u+2;l("comment",e.slice(a,v)),a=v;continue}if(i==="'"||i==='"'||i==="`"){let u=a+1;for(;u<e.length;){if(e[u]==="\\"){u+=2;continue}if(e[u]===i){if(e[u+1]===i){u+=2;continue}u+=1;break}u+=1}l(i==="'"?"string":"ident",e.slice(a,u)),a=u;continue}if(i==="$"&&/^\$[A-Za-z_]*\$/.test(d)){let u=/^\$[A-Za-z_]*\$/.exec(d)[0],v=e.indexOf(u,a+u.length),h=v===-1?e.length:v+u.length;l("string",e.slice(a,h)),a=h;continue}if(/[0-9]/.test(i)||i==="."&&/[0-9]/.test(e[a+1]??"")){let u=/^[0-9]*\.?[0-9]+(?:[eE][-+]?[0-9]+)?/.exec(d);l("number",u?u[0]:i),a+=u?u[0].length:1;continue}if(/[A-Za-z_@:]/.test(i)){let v=/^[A-Za-z_@:][A-Za-z0-9_$@:]*/.exec(d)[0],h=v.toLowerCase(),L=e[a+v.length];i==="@"||i===":"?l("variable",v):dt.has(h)?l("keyword",v):L==="("||lt.has(h)?l("function",v):l("plain",v),a+=v.length;continue}if(/[(),;]/.test(i)){l("punct",i),a+=1;continue}if(/[=<>!+\-*/%|]/.test(i)){let u=/^(?:<>|!=|<=|>=|\|\||::|[-+*/%=<>])/.exec(d);l("operator",u?u[0]:i),a+=u?u[0].length:1;continue}l("ws",i),a+=1}return n}function Et(t){let e=String(t??"").trim();if(!e)return"";let n=ct(e),a=[],l="",i=0,d=()=>{let u=l.replace(/\s+/g," ").trim();u&&a.push(u),l=""};for(let u=0;u<n.length;u+=1){let v=n[u];if(v.type==="ws"){l+=" ";continue}if(v.type==="comment"){d(),a.push(v.value.trim());continue}if(v.type==="punct"){v.value==="("&&(i+=1),v.value===")"&&(i=Math.max(0,i-1)),l+=v.value;continue}if(v.type==="keyword"){let h=v.value.toUpperCase(),L=n[u+1],D=n[u+2];if(L&&L.type==="ws"&&D&&D.type==="keyword"){let P=`${h} ${D.value.toUpperCase()}`;St.includes(P)&&(h=P,u+=2)}if(i===0&&St.includes(h)){d(),l=`${h} `;continue}l+=`${h} `;continue}l+=v.value}return d(),a.length<2?e:a.join(`
  `).replace(/[ \t]+$/gm,"")}function Ae(t,e){let n=String(e??"");return t==="mysql"?"`"+n.replace(/`/g,"``")+"`":t==="sqlserver"?"["+n.replace(/]/g,"]]")+"]":'"'+n.replace(/"/g,'""')+'"'}function it(t){let e=String(t??"").trim();return e===""?"''":/^-?\d+(\.\d+)?$/.test(e)?e:/^(null|true|false)$/i.test(e)?e.toUpperCase():`'${e.replace(/'/g,"''")}'`}var It=["=","<>",">",">=","<","<=","LIKE","NOT LIKE","IN","BETWEEN","IS NULL","IS NOT NULL"];function gt(t,e){let n=[];for(let a of e.conditions){if(!a.column)continue;let l=Ae(t,a.column),i=a.op;if(i==="IS NULL"||i==="IS NOT NULL"){n.push(`${l} ${i}`);continue}let d=String(a.value??"");if(d!==""){if(i==="IN"){let u=d.split(",").map(it).filter(Boolean);if(u.length===0)continue;n.push(`${l} IN (${u.join(", ")})`);continue}if(i==="BETWEEN"){let u=d.split(",").map(it);if(u.length<2)continue;n.push(`${l} BETWEEN ${u[0]} AND ${u[1]}`);continue}n.push(`${l} ${i} ${it(d)}`)}}return n.join(` ${e.joiner} `)}function Rt(t,e){let n=document.createElement("div"),a=window.getComputedStyle(t),l=["fontFamily","fontSize","fontWeight","lineHeight","letterSpacing","padding","border","whiteSpace","wordWrap","tabSize"];for(let v of l)n.style[v]=a[v];n.style.position="absolute",n.style.visibility="hidden",n.style.width=`${t.clientWidth}px`,n.style.whiteSpace="pre-wrap",n.style.overflowWrap="break-word",n.textContent=t.value.slice(0,e);let i=document.createElement("span");i.textContent="\u200B",n.appendChild(i),document.body.appendChild(n);let d=i.offsetLeft-t.scrollLeft,u=i.offsetTop-t.scrollTop;return document.body.removeChild(n),{left:Math.max(0,d),top:u}}function ve(t,e){return String(t).replace(/\{(\w+)\}/g,(n,a)=>e&&e[a]!==void 0?String(e[a]):n)}function We(t,e,n=300){if(t==null)return{text:e,isNull:!0,numeric:!1};if(typeof t=="object")try{let l=JSON.stringify(t);return{text:l.length>n?`${l.slice(0,n)}\u2026`:l,isNull:!1,numeric:!1}}catch{return{text:String(t),isNull:!1,numeric:!1}}let a=String(t);return{text:a.length>n?`${a.slice(0,n)}\u2026`:a,isNull:!1,numeric:typeof t=="number"}}function Je(t){if(t==null)return"";let e=typeof t=="object"?JSON.stringify(t):String(t);return/[",\n\r]/.test(e)?`"${e.replace(/"/g,'""')}"`:e}function Tt(t){return String(t||"table").replace(/[^\w.-]+/g,"_").slice(0,60)}function Ve(t,e,n){let a=new Blob([n],{type:`${e};charset=utf-8`}),l=URL.createObjectURL(a),i=document.createElement("a");i.href=l,i.download=t,document.body.appendChild(i),i.click(),i.remove(),setTimeout(()=>URL.revokeObjectURL(l),1e3)}function Cn(t,e){return t==null?"NULL":typeof t=="number"?Number.isFinite(t)?String(t):"NULL":typeof t=="boolean"?e==="sqlserver"?t?"1":"0":t?"TRUE":"FALSE":`'${(typeof t=="object"?JSON.stringify(t):String(t)).replace(/'/g,"''")}'`}function Mt(t,e,n,a){let i=[e.database,...t==="postgres"||t==="sqlserver"?[e.schema]:[],e.table].filter(Boolean).map(u=>Ae(t,u)).join("."),d=n.map(u=>Ae(t,u.name)).join(", ");return a.map(u=>`INSERT INTO ${i} (${d}) VALUES (${n.map(v=>Cn(u[v.name],t)).join(", ")});`).join(`
`)}function zt(t,e){let n=d=>d==null?"":(typeof d=="object"?JSON.stringify(d):String(d)).replace(/\|/g,"\\|").replace(/\r?\n/g," "),a=`| ${t.map(d=>n(d.name)).join(" | ")} |`,l=`| ${t.map(()=>"---").join(" | ")} |`,i=e.map(d=>`| ${t.map(u=>n(d[u.name])).join(" | ")} |`);return[a,l,...i].join(`
`)}function $t(t){let e=String(t??"").replace(/^\uFEFF/,""),n=[],a=[],l="",i=!1,d=0,u=()=>{a.push(l),l=""},v=()=>{u(),(a.length>1||a[0]!=="")&&n.push(a),a=[]};for(;d<e.length;){let P=e[d];if(i){if(P==='"'){if(e[d+1]==='"'){l+='"',d+=2;continue}i=!1,d+=1;continue}l+=P,d+=1;continue}if(P==='"'&&l===""){i=!0,d+=1;continue}if(P===","){u(),d+=1;continue}if(P==="\r"){d+=e[d+1]===`
`?2:1,v();continue}if(P===`
`){d+=1,v();continue}l+=P,d+=1}(l!==""||a.length>0)&&v();let[h=[],...L]=n,D=h.length;return{header:h.map(P=>P.trim()),rows:L.map(P=>{let x=P.slice(0,D);for(;x.length<D;)x.push("");return x})}}function Dt(t){if(!Number.isFinite(t)||t<=0)return"0 B";let e=["B","KB","MB","GB"],n=t,a=0;for(;n>=1024&&a<e.length-1;)n/=1024,a+=1;return`${n.toFixed(a===0?0:1)} ${e[a]}`}function Pt(t){let e=Date.parse(t);if(Number.isNaN(e))return"";let n=Math.max(1,Math.round((Date.now()-e)/1e3));return n<60?`${n}s`:n<3600?`${Math.round(n/60)}m`:n<86400?`${Math.round(n/3600)}h`:`${Math.round(n/86400)}d`}var Bt=require("react");var Ue=class extends Error{constructor(n,a){super(n);this.status=a;this.name="ApiError"}},Sn="api/grid",ut=class{constructor(e=Sn){this.path=e}async call(e,n={},a){let l;try{l=await fetch(this.path,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({action:e,...n}),...a?{signal:a}:{}})}catch(u){throw u instanceof DOMException&&u.name==="AbortError"?u:new Ue(u instanceof Error?u.message:String(u),0)}let i=null;try{i=await l.json()}catch{i=null}let d=i&&typeof i=="object"?i:{};if(!l.ok||d.error)throw new Ue(String(d.error??`request failed (${l.status})`),l.status);return d}meta(){return this.call("meta")}listConnections(){return this.call("connections.list")}createConnection(e){return this.call("connections.create",{connection:e})}updateConnection(e,n){return this.call("connections.update",{id:e,patch:n})}deleteConnection(e){return this.call("connections.delete",{id:e})}testConnection(e){return this.call("connections.test",{id:e})}testDraft(e,n){return this.call("connections.test",{connection:e,...n?{id:n}:{}})}connect(e){return this.call("connections.connect",{id:e})}disconnect(e){return this.call("connections.disconnect",{id:e})}sessions(){return this.call("connections.sessions")}databases(e){return this.call("databases",{connectionId:e})}relations(e,n,a){return this.call("tables",{connectionId:e,database:n,schema:a})}describe(e,n,a,l){return this.call("columns",{connectionId:e,database:n,schema:a,table:l})}rows(e,n){return this.call("rows",e,n)}updateRow(e){return this.call("rows.update",e)}insertRow(e){return this.call("rows.insert",e)}insertRows(e){return this.call("rows.insertMany",e)}deleteRow(e){return this.call("rows.delete",e)}exportRows(e){return this.call("export",e)}sql(e){return this.call("sql",e)}sqlCancel(e){return this.call("sql.cancel",{connectionId:e})}routines(e,n,a){return this.call("routines",{connectionId:e,database:n,schema:a})}accounts(e){return this.call("accounts",{connectionId:e})}listQueries(){return this.call("queries.list")}saveQuery(e){return this.call("queries.save",e)}deleteQuery(e){return this.call("queries.delete",{id:e})}bindProject(e){return this.call("projects.bind",e)}unbindProject(e){return this.call("projects.unbind",{workspaceId:e})}redisDatabases(e){return this.call("redis.databases",{connectionId:e})}redisScan(e){return this.call("redis.scan",e)}redisKey(e,n,a){return this.call("redis.key",{connectionId:e,key:n,database:a})}redisCommand(e,n){return this.call("redis.command",{connectionId:e,command:n})}redisDelete(e,n,a){return this.call("redis.delete",{connectionId:e,key:n,database:a})}engines(){return this.call("meta")}},H=new ut;var ze=class{constructor(e){this.listeners=new Set;this.getSnapshot=()=>this.state;this.subscribe=e=>(this.listeners.add(e),()=>{this.listeners.delete(e)});this.state=e}setState(e){this.state=e;for(let n of this.listeners)n()}patch(e){this.setState({...this.state,...e})}};function fe(t){return(0,Bt.useSyncExternalStore)(t.subscribe,t.getSnapshot,t.getSnapshot)}var mt=class extends ze{constructor(){super({meta:null,error:""})}async load(){try{this.patch({meta:await H.meta(),error:""})}catch(e){this.patch({error:e instanceof Error?e.message:String(e)})}}get current(){return this.state.meta}engines(){return this.state.meta?.engines??[]}get allowWrites(){return this.state.meta?.allowWrites===!0}},qt={status:"closed",version:"",error:"",databases:[]},pt=class extends ze{constructor(){super({items:[],activeId:"",loading:!1,error:"",sessions:{},testing:{}})}async load(){this.patch({loading:!0});try{let{connections:e}=await H.listConnections(),n=this.state.items.some(a=>a.id===this.state.activeId)?this.state.activeId:e[0]?.id??"";this.patch({items:e,activeId:n,loading:!1,error:""})}catch(e){this.patch({loading:!1,error:e instanceof Error?e.message:String(e)})}}select(e){this.patch({activeId:e})}get active(){return this.state.items.find(e=>e.id===this.state.activeId)??null}session(e){return this.state.sessions[e]??qt}setSession(e,n){let a=this.session(e);this.patch({sessions:{...this.state.sessions,[e]:{...a,...n}}})}async create(e){let n=await H.createConnection(e);return await this.load(),this.select(n.connection.id),n.probe}async update(e,n){await H.updateConnection(e,n),this.setSession(e,{status:"closed",version:"",databases:[]}),await this.load()}async remove(e){await H.deleteConnection(e);let n={...this.state.sessions};delete n[e],this.patch({sessions:n}),await this.load()}async test(e){this.patch({testing:{...this.state.testing,[e]:!0}});try{return await H.testConnection(e)}finally{this.patch({testing:{...this.state.testing,[e]:!1}})}}async connect(e){if(this.session(e).status!=="open"){this.setSession(e,{status:"opening",error:""});try{let n=await H.connect(e),{databases:a}=await H.databases(e);this.setSession(e,{status:"open",version:n.serverVersion,databases:a,error:""})}catch(n){this.setSession(e,{status:"error",error:n instanceof Error?n.message:String(n)})}}}async disconnect(e){await H.disconnect(e).catch(()=>{}),this.setSession(e,{...qt})}async reloadDatabases(e){if(this.session(e).status!=="open")return this.connect(e);try{let{databases:n}=await H.databases(e);this.setSession(e,{databases:n})}catch(n){this.setSession(e,{status:"error",error:n instanceof Error?n.message:String(n)})}}};function Lt(t,e,n=""){return`${t}|${e}|${n}`}var vt=class extends ze{constructor(){super({relations:{},routines:{},accounts:{},loading:{},errors:{}})}relationsOf(e){return this.state.relations[e]??[]}routinesOf(e){return this.state.routines[e]??[]}accountsOf(e){return this.state.accounts[e]??[]}isLoading(e){return this.state.loading[e]===!0}errorOf(e){return this.state.errors[e]??""}async run(e,n,a){this.patch({loading:{...this.state.loading,[e]:!0}});try{let l=await n();this.setState({...this.state,...a(l),loading:{...this.state.loading,[e]:!1},errors:{...this.state.errors,[e]:""}})}catch(l){this.setState({...this.state,loading:{...this.state.loading,[e]:!1},errors:{...this.state.errors,[e]:l instanceof Error?l.message:String(l)}})}}async loadRelations(e,n,a="",l=!1){let i=Lt(e,n,a);!l&&this.state.relations[i]||await this.run(i,()=>H.relations(e,n,a),({tables:d})=>({relations:{...this.state.relations,[i]:d}}))}async loadRoutines(e,n,a="",l=!1){let i=Lt(e,n,a);!l&&this.state.routines[i]||await this.run(i,()=>H.routines(e,n,a),({routines:d})=>({routines:{...this.state.routines,[i]:d}}))}async loadAccounts(e,n=!1){!n&&this.state.accounts[e]||await this.run(e,()=>H.accounts(e),({accounts:a})=>({accounts:{...this.state.accounts,[e]:a}}))}invalidate(e){let n={...this.state.relations};delete n[e],this.patch({relations:n})}},ft=class extends ze{constructor(){super({tabs:[],activeId:""})}open(e){let n=this.state.tabs.some(a=>a.id===e.id);this.setState({tabs:n?this.state.tabs:this.state.tabs.concat(e),activeId:e.id})}activate(e){this.patch({activeId:e})}close(e){let n=this.state.tabs.findIndex(i=>i.id===e),a=this.state.tabs.filter(i=>i.id!==e),l=a[Math.max(0,n-1)];this.setState({tabs:a,activeId:this.state.activeId===e?l?.id??"":this.state.activeId})}closeConnection(e){let n=this.state.tabs.filter(l=>l.connectionId!==e),a=n.some(l=>l.id===this.state.activeId);this.setState({tabs:n,activeId:a?this.state.activeId:n[n.length-1]?.id??""})}get active(){return this.state.tabs.find(e=>e.id===this.state.activeId)??null}},ht=class extends ze{constructor(){super({items:[],loading:!1,error:""})}async load(){this.patch({loading:!0});try{let{queries:e}=await H.listQueries();this.patch({items:e,loading:!1,error:""})}catch(e){this.patch({loading:!1,error:e instanceof Error?e.message:String(e)})}}async save(e){let{query:n}=await H.saveQuery(e);return await this.load(),n}async remove(e){await H.deleteQuery(e),await this.load()}},_e=class{constructor(){this.meta=new mt;this.connections=new pt;this.catalog=new vt;this.tabs=new ft;this.queries=new ht}async bootstrap(){await Promise.all([this.meta.load(),this.connections.load(),this.queries.load()])}bindings(){return this.meta.current?.bindings??[]}bindingFor(e){return this.bindings().find(n=>n.workspaceId===e)??null}};var Oe=require("react"),bt=require("react-dom"),K=require("react/jsx-runtime"),At={plus:"M12 5v14M5 12h14",refresh:"M20 11a8 8 0 1 0-2.3 5.7M20 5v6h-6",play:"M8 5v14l11-7z",trash:"M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3",pencil:"M4 20h4L20 8l-4-4L4 16z",chevron:"M9 6l6 6-6 6",chevronLeft:"M15 6l-6 6 6 6",database:"M12 3c4 0 7 1.3 7 3s-3 3-7 3-7-1.3-7-3 3-3 7-3zM5 6v12c0 1.7 3 3 7 3s7-1.3 7-3V6",table:"M4 5h16v14H4zM4 10h16M10 10v9",view:"M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",key:"M14 4a6 6 0 1 0-5.2 8.9L4 18v2h3v-3h3v-3h2.2A6 6 0 0 0 14 4z",search:"M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM16 16l4 4",download:"M12 4v10M8 11l4 4 4-4M5 19h14",x:"M6 6l12 12M18 6L6 18",check:"M5 13l4 4L19 7",plug:"M9 3v6M15 3v6M6 9h12v3a6 6 0 0 1-12 0zM12 18v3",unplug:"M9 3v6M15 3v6M6 9h12v3a6 6 0 0 1-6 6M12 18v3M4 4l16 16",filter:"M4 5h16l-6 7v6l-4 2v-8z",folder:"M3 6h6l2 2h10v11H3z",copy:"M9 9h10v10H9zM5 15V5h10",alert:"M12 4l9 16H3zM12 10v4M12 17h.01",columns:"M4 5h16M4 12h16M4 19h16",wand:"M4 20l10-10M14 5l1.5 1.5M18 3l1 2 2 .5-2 1.5.5 2-2-1-2 1 .5-2-2-1.5 2-.5z",history:"M12 8v5l3 2M4 12a8 8 0 1 0 3-6.2M4 4v4h4",function:"M9 4c-2 0-3 1-3 3v10c0 2-1 3-3 3M6 11h7M15 14l5 6M20 14l-5 6",user:"M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM4 21a8 8 0 0 1 16 0",bookmark:"M6 4h12v17l-6-4-6 4z",archive:"M4 4h16v4H4zM5 8h14v12H5zM9 13h6",link:"M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1",info:"M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 11v6M12 8h.01"};function S({name:t,size:e=14}){return(0,K.jsx)("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:1.7,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0,focusable:"false",children:(0,K.jsx)("path",{d:At[t]??At.table})})}function O(t){let e=["dg-btn"];return t.variant&&t.variant!=="default"&&e.push(`dg-btn-${t.variant}`),t.size==="sm"&&e.push("dg-btn-sm"),t.active&&e.push("dg-btn-active"),(0,K.jsx)("button",{type:t.type??"button",className:e.join(" "),onClick:t.onClick,disabled:t.disabled,title:t.title,"aria-label":t.title,"aria-pressed":t.active,children:t.children})}function oe(t){return(0,K.jsx)("button",{type:"button",className:`dg-iconbtn${t.active?" dg-btn-active":""}`,title:t.title,"aria-label":t.title,onClick:t.onClick,disabled:t.disabled,children:(0,K.jsx)(S,{name:t.icon,size:t.size??13})})}function ge(t){return(0,K.jsxs)("label",{className:`dg-field${t.wide?" dg-field-wide":""}`,children:[(0,K.jsx)("span",{className:"dg-field-label",children:t.label}),t.children,t.hint?(0,K.jsx)("span",{className:"dg-field-hint",children:t.hint}):null]})}function se(t){let{className:e,...n}=t;return(0,K.jsx)("input",{...n,className:`dg-input${e?` ${e}`:""}`})}function Ot(t){let{className:e,...n}=t;return(0,K.jsx)("textarea",{...n,className:`dg-input dg-textarea${e?` ${e}`:""}`})}function ke(t){return(0,K.jsx)("select",{...t,className:`dg-input dg-select${t.className?` ${t.className}`:""}`})}function we({label:t}){return(0,K.jsxs)("span",{className:"dg-spinner-row",children:[(0,K.jsx)("span",{className:"dg-spinner","aria-hidden":!0}),t?(0,K.jsx)("span",{children:t}):null]})}function ye({title:t,hint:e,children:n}){return(0,K.jsxs)("div",{className:"dg-empty",children:[(0,K.jsx)("div",{className:"dg-empty-title",children:t}),e?(0,K.jsx)("div",{className:"dg-empty-hint",children:e}):null,n]})}function ue(t){return t.children?(0,K.jsxs)("div",{className:`dg-banner dg-banner-${t.tone??"info"}`,role:"status",children:[(0,K.jsx)(S,{name:t.tone==="error"?"alert":"check",size:12}),(0,K.jsx)("span",{className:"dg-banner-text",children:t.children}),t.onClose?(0,K.jsx)("button",{type:"button",className:"dg-iconbtn dg-iconbtn-tiny",onClick:t.onClose,"aria-label":"dismiss",children:(0,K.jsx)(S,{name:"x",size:10})}):null]}):null}function Kt(t){return(0,K.jsx)("div",{className:"dg-seg",children:t.options.map(e=>(0,K.jsx)("button",{type:"button",className:e.value===t.value?"dg-seg-on":"",onClick:()=>t.onChange(e.value),children:e.label},e.value))})}function Ft({status:t}){return(0,K.jsx)("span",{className:`dg-dot${t==="open"?" dg-dot-open":t==="error"?" dg-dot-error":t==="opening"?" dg-dot-busy":""}`})}function Ee(t){let e=(0,Oe.useRef)(null);return(0,Oe.useEffect)(()=>{let n=l=>{l.key==="Escape"&&!t.busy&&(l.stopPropagation(),t.onClose())};document.addEventListener("keydown",n);let a=setTimeout(()=>e.current?.focus(),0);return()=>{document.removeEventListener("keydown",n),clearTimeout(a)}},[t.busy,t.onClose]),(0,bt.createPortal)((0,K.jsx)("div",{className:"dg-backdrop",onMouseDown:n=>{n.target===n.currentTarget&&!t.busy&&t.onClose()},children:(0,K.jsxs)("div",{className:"dg-modal",style:{width:`${t.width??520}px`},role:"dialog","aria-modal":"true","aria-label":t.title,children:[(0,K.jsxs)("div",{className:"dg-modal-head",children:[(0,K.jsxs)("div",{className:"dg-modal-title-wrap",children:[t.icon?(0,K.jsx)("span",{className:"dg-modal-icon-badge",children:(0,K.jsx)(S,{name:t.icon,size:15})}):null,(0,K.jsxs)("div",{children:[(0,K.jsx)("div",{className:"dg-modal-title",children:t.title}),t.subtitle?(0,K.jsx)("div",{className:"dg-modal-subtitle",children:t.subtitle}):null]})]}),(0,K.jsx)("button",{ref:e,type:"button",className:"dg-iconbtn",onClick:()=>!t.busy&&t.onClose(),"aria-label":"close",children:(0,K.jsx)(S,{name:"x",size:13})})]}),(0,K.jsx)("div",{className:"dg-modal-body",children:t.children}),t.footer?(0,K.jsx)("div",{className:"dg-modal-foot",children:t.footer}):null]})}),document.body)}function Ke(t){let e=(0,Oe.useRef)(null);(0,Oe.useEffect)(()=>{let a=i=>{e.current&&!e.current.contains(i.target)&&t.onClose()},l=i=>{i.key==="Escape"&&t.onClose()};return document.addEventListener("mousedown",a),document.addEventListener("keydown",l),()=>{document.removeEventListener("mousedown",a),document.removeEventListener("keydown",l)}},[t.onClose]);let n=t.items.filter(Boolean);return(0,bt.createPortal)((0,K.jsx)("div",{ref:e,className:"dg-ctxmenu",role:"menu",style:{left:`${Math.min(t.x,window.innerWidth-200)}px`,top:`${Math.min(t.y,Math.max(8,window.innerHeight-40-n.length*26))}px`},children:n.map((a,l)=>a.separator?(0,K.jsx)("div",{className:"dg-ctxsep"},`sep-${l}`):(0,K.jsxs)("button",{type:"button",role:"menuitem",className:`dg-ctxitem${a.danger?" dg-ctxitem-danger":""}`,disabled:a.disabled,onClick:()=>{t.onClose(),a.disabled||a.onClick?.()},children:[a.icon?(0,K.jsx)(S,{name:a.icon,size:12}):null,a.label,a.hint?(0,K.jsx)("span",{className:"dg-ctxhint",children:a.hint}):null]},`${a.label}-${l}`))}),document.body)}function jt(t){return(0,K.jsx)("div",{className:"dg-split",role:"separator","aria-orientation":"vertical",onMouseDown:n=>{n.preventDefault();let a=n.clientX,l=t.width;t.onDragging?.(!0);let i=u=>{t.setWidth(Math.max(t.min,Math.min(t.max,l+u.clientX-a)))},d=()=>{t.onDragging?.(!1),window.removeEventListener("mousemove",i),window.removeEventListener("mouseup",d)};window.addEventListener("mousemove",i),window.addEventListener("mouseup",d)}})}var Qt=`/* Grid panel styles.
 *
 * Everything is built on host theme tokens, so light/dark follows the app. Two
 * rules keep that promise honest:
 *
 * 1. \`--dsw-alias-bg-layer-1/2/3\` are all identical to \`bg-base\` in light mode
 *    (white), so a surface or a hover painted with them is invisible there. The
 *    panel therefore defines its own surfaces as a tint of \`label-primary\`,
 *    which inverts with the theme: the same declaration reads as light grey on
 *    white and as lifted grey on near-black.
 * 2. \`--dsw-alias-border-l1\` is 4% black in light mode, which is not enough to
 *    separate a header from its rows; structural lines use \`border-l2\` and cell
 *    lines a measured tint.
 *
 * Colours, radii, spacing and type sizes are declared once below as \`--dg-*\`
 * tokens; no component rule spells out a raw value.
 */

/* The layer is declared on the panel *and* on the two overlays that portal
   themselves to <body>, because they do not inherit from \`.dg-root\`. */
.dg-root,
.dg-backdrop,
.dg-ctxmenu {
  /* -- colour ------------------------------------------------------------- */
  --dg-bg: var(--dsw-alias-bg-base);
  /* Panes, toolbars and headers: a tint of the text colour, so it lifts off
     the background in both themes. */
  --dg-surface: color-mix(in srgb, var(--dsw-alias-label-primary) 3%, var(--dsw-alias-bg-base));
  /* Chips, badges, inset fields: one step further from the background. */
  --dg-surface-2: color-mix(in srgb, var(--dsw-alias-label-primary) 7%, var(--dsw-alias-bg-base));
  --dg-hover: var(--dsw-alias-interactive-bg-hover, color-mix(in srgb, var(--dsw-alias-label-primary) 6%, transparent));
  --dg-pressed: var(--dsw-alias-interactive-bg-active, color-mix(in srgb, var(--dsw-alias-label-primary) 10%, transparent));

  --dg-line: var(--dsw-alias-border-l2);
  --dg-line-soft: var(--dsw-alias-border-l1);
  /* Cell rules and row separators: strong enough to be seen in light mode,
     faint enough not to compete with the data. */
  --dg-line-cell: color-mix(in srgb, var(--dsw-alias-label-primary) 9%, transparent);
  --dg-zebra: color-mix(in srgb, var(--dsw-alias-label-primary) 4%, transparent);

  --dg-text: var(--dsw-alias-label-primary);
  --dg-text-2: var(--dsw-alias-label-secondary);
  /* \`label-tertiary\` is 3.7:1 on a light surface: an icon colour, never a text
     colour. Informational text at any size stays on \`--dg-text-2\` (5.8:1). */
  --dg-text-3: var(--dsw-alias-label-tertiary);

  /* The accent is the host's chromatic blue (deepseek-500, the same value in
     both themes). At ~4.2:1 it is a fill and glyph colour, never body text:
     text on an accent-tinted surface stays \`--dg-text\`. */
  --dg-accent: var(--dsw-alias-state-business-primary, #4176e6);
  --dg-accent-soft: color-mix(in srgb, var(--dg-accent) 12%, transparent);
  --dg-accent-line: color-mix(in srgb, var(--dg-accent) 40%, transparent);

  --dg-error: var(--dsw-alias-state-error-primary);
  --dg-success: var(--dsw-alias-state-success-primary);
  --dg-warn: var(--dsw-alias-state-warn-primary);
  --dg-error-soft: color-mix(in srgb, var(--dg-error) 10%, transparent);
  --dg-success-soft: color-mix(in srgb, var(--dg-success) 10%, transparent);

  /* Syntax colours are the host highlighter's own palette, pulled 24% toward
     the text colour. At full strength the light-mode string (#2f9e44, 3.4:1) and
     comment (#868e96, 3.0:1) tokens are below the text threshold on white; the
     same pull moves the dark-theme tokens toward near-white, which is the
     direction they need there. The hue, and with it the app's code look, stays. */
  --dg-code-plain: var(--shiki-foreground, var(--dsw-alias-label-primary));
  --dg-code-keyword: color-mix(in srgb, var(--shiki-token-keyword, #d6336c) 76%, var(--dsw-alias-label-primary));
  --dg-code-function: color-mix(in srgb, var(--shiki-token-function, #6741d9) 76%, var(--dsw-alias-label-primary));
  --dg-code-string: color-mix(in srgb, var(--shiki-token-string, #2f9e44) 76%, var(--dsw-alias-label-primary));
  --dg-code-number: color-mix(in srgb, var(--shiki-token-constant, #1c7ed6) 76%, var(--dsw-alias-label-primary));
  --dg-code-comment: color-mix(in srgb, var(--shiki-token-comment, #868e96) 76%, var(--dsw-alias-label-primary));
  --dg-code-operator: color-mix(in srgb, var(--shiki-token-parameter, #e8590c) 76%, var(--dsw-alias-label-primary));
  --dg-code-punct: color-mix(in srgb, var(--shiki-token-punctuation, #495057) 76%, var(--dsw-alias-label-primary));
  --dg-code-variable: color-mix(in srgb, var(--shiki-token-link, #1971c2) 76%, var(--dsw-alias-label-primary));

  --dg-elev-1: var(--dsw-elevation-panel, 0 3px 8px #0000000f);
  --dg-elev-2: var(--dsw-elevation-prominent, 0 10px 30px #0000001f);
  --dg-mask: var(--dsw-alias-bg-mask-3, #0000007a);

  /* -- geometry ----------------------------------------------------------- */
  --dg-r-xs: 4px;
  --dg-r-sm: 6px;
  --dg-r-md: 8px;
  --dg-r-lg: 10px;
  --dg-r-pill: 999px;

  --dg-sp-1: 2px;
  --dg-sp-2: 4px;
  --dg-sp-3: 6px;
  --dg-sp-4: 8px;
  --dg-sp-5: 12px;
  --dg-sp-6: 16px;

  /* -- type --------------------------------------------------------------- */
  /* Four steps replace the seven ad-hoc sizes the panel used to mix, and the
     smallest one is the host's 11px floor rather than 9.5px. */
  --dg-fs-xs: 11px;
  --dg-fs-sm: 12px;
  --dg-fs-md: 13px;
  --dg-fs-lg: 18px;
  --dg-lh-tight: 1.35;
  --dg-lh-body: 1.55;
  --dg-mono: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;

  /* -- metrics ------------------------------------------------------------ */
  --dg-row: 28px;
  --dg-ctl: 28px;
  --dg-ctl-sm: 24px;
  --dg-icon-btn: 26px;

  --dg-dur-1: 100ms;
  --dg-dur-2: 160ms;
  --dg-ease: cubic-bezier(0.2, 0, 0, 1);
}

.dg-root {
  box-sizing: border-box;
  height: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
  background: var(--dg-bg);
  color: var(--dg-text);
  font-size: var(--dg-fs-md);
  line-height: var(--dg-lh-tight);
  overflow: hidden;
  padding-top: var(--dsh-frame-top-clearance, 0px);
  position: relative;
}
.dg-root * { box-sizing: border-box; }
.dg-root button { font: inherit; }

/* The host already hides the ring for pointer input by setting
   \`--dsw-focus-ring-color: transparent\`; reading the same variables keeps that
   behaviour instead of overriding it. */
.dg-root :focus-visible,
.dg-backdrop :focus-visible,
.dg-ctxmenu :focus-visible {
  outline: var(--dsw-focus-ring-width, 2px) solid var(--dsw-focus-ring-color, var(--dg-accent));
  outline-offset: 1px;
}

.dg-mono { font-family: var(--dg-mono); font-size: var(--dg-fs-sm); }
.dg-muted { color: var(--dg-text-2); }
/* For the one-line notes that used to set \`fontSize\` inline. */
.dg-hint { font-size: var(--dg-fs-xs); color: var(--dg-text-2); line-height: var(--dg-lh-tight); }
.dg-truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; min-width: 0; }
.dg-row { display: flex; align-items: center; gap: var(--dg-sp-3); min-width: 0; }
.dg-spacer { flex: 1; min-width: 0; }

/* toolbar ------------------------------------------------------------------ */
.dg-toolbar {
  display: flex; align-items: center; gap: var(--dg-sp-2);
  padding: var(--dg-sp-2) var(--dg-sp-4);
  padding-left: max(var(--dg-sp-4), var(--dsh-frame-leading-clearance, 12px));
  min-height: 48px;
  border-bottom: 1px solid var(--dg-line);
  background: var(--dg-surface);
  flex: none;
  /* Wraps rather than clips: with \`overflow: hidden\` the rightmost buttons
     simply vanished on a narrow panel. */
  flex-wrap: wrap;
  overflow: visible;
}
.dg-toolgroup { display: flex; align-items: center; gap: var(--dg-sp-1); }
.dg-toolbar-divider { width: 1px; height: 20px; background: var(--dg-line); margin: 0 var(--dg-sp-2); flex: none; }
.dg-brand { display: flex; align-items: center; gap: var(--dg-sp-2); font-weight: 600; font-size: var(--dg-fs-md); white-space: nowrap; margin-right: var(--dg-sp-2); }
.dg-brand-badge {
  display: inline-flex; align-items: center; justify-content: center;
  width: 26px; height: 26px; border-radius: 8px;
  background: color-mix(in srgb, var(--dg-accent) 14%, transparent);
  color: var(--dg-accent); flex: none;
}
.dg-brand-title { font-weight: 600; letter-spacing: -0.01em; color: var(--dg-text); }

/* buttons ------------------------------------------------------------------ */
.dg-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: var(--dg-sp-2);
  height: var(--dg-ctl); padding: 0 var(--dg-sp-4);
  border: 1px solid var(--dg-line); border-radius: var(--dg-r-sm);
  background: var(--dg-bg);
  color: var(--dg-text);
  font-size: var(--dg-fs-sm); cursor: pointer; white-space: nowrap;
  transition: background var(--dg-dur-1) var(--dg-ease), border-color var(--dg-dur-1) var(--dg-ease),
    color var(--dg-dur-1) var(--dg-ease), transform var(--dg-dur-1) var(--dg-ease);
}
.dg-btn:hover:not(:disabled) { background: var(--dg-hover); }
.dg-btn:active:not(:disabled) { background: var(--dg-pressed); transform: scale(0.98); }
.dg-btn:disabled { opacity: 0.42; cursor: default; }
/* The host's solid call-to-action: black on white in light mode, near-white on
   dark in dark mode. */
.dg-btn-primary {
  background: var(--dsw-alias-button-primary-fill, var(--dg-accent));
  border-color: var(--dsw-alias-button-primary-fill, var(--dg-accent));
  color: var(--dsw-alias-label-primary-inverted, #fff);
  font-weight: 500;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}
.dg-btn-primary:hover:not(:disabled) {
  background: var(--dsw-alias-button-primary-hover, color-mix(in srgb, var(--dg-accent) 85%, #000));
  border-color: var(--dsw-alias-button-primary-hover, color-mix(in srgb, var(--dg-accent) 85%, #000));
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
}
.dg-btn-new-conn {
  background: var(--dg-accent);
  border: 1px solid var(--dg-accent);
  color: #fff;
  font-weight: 500;
  border-radius: var(--dg-r-pill);
  padding: 0 13px;
  height: var(--dg-ctl);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--dg-sp-2);
  cursor: pointer;
  white-space: nowrap;
  font-size: var(--dg-fs-sm);
  box-shadow: 0 1px 3px rgba(65, 118, 230, 0.28);
  transition: all var(--dg-dur-2) var(--dg-ease);
}
.dg-btn-new-conn:hover:not(:disabled) {
  background: color-mix(in srgb, var(--dg-accent) 85%, #000);
  border-color: color-mix(in srgb, var(--dg-accent) 85%, #000);
  box-shadow: 0 2px 6px rgba(65, 118, 230, 0.38);
  transform: translateY(-0.5px);
}
.dg-btn-new-conn:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: 0 1px 2px rgba(65, 118, 230, 0.2);
}
.dg-btn-tonal {
  background: color-mix(in srgb, var(--dg-accent) 12%, transparent);
  border-color: transparent;
  color: var(--dg-text);
  font-weight: 500;
}
.dg-btn-tonal:hover:not(:disabled) {
  background: color-mix(in srgb, var(--dg-accent) 20%, transparent);
  color: var(--dg-text);
}
.dg-btn-danger { color: var(--dg-error); border-color: color-mix(in srgb, var(--dg-error) 38%, var(--dg-line)); }
.dg-btn-danger:hover:not(:disabled) { background: var(--dg-error-soft); }
.dg-btn-ghost { background: transparent; border-color: transparent; color: var(--dg-text-2); }
.dg-btn-ghost:hover:not(:disabled) { background: var(--dg-hover); border-color: transparent; color: var(--dg-text); }
.dg-btn-sm { height: var(--dg-ctl-sm); padding: 0 var(--dg-sp-3); font-size: var(--dg-fs-xs); }
/* A pressed toggle is a filled state, not a coloured label. */
.dg-btn-active {
  background: var(--dg-accent-soft);
  border-color: var(--dg-accent-line);
  color: var(--dg-text);
  font-weight: 600;
}
.dg-btn-active:hover:not(:disabled) { background: color-mix(in srgb, var(--dg-accent) 18%, transparent); }

/* conversation binding assist chip ----------------------------------------- */
.dg-binding-chip {
  display: inline-flex; align-items: center; gap: 6px;
  height: 28px; padding: 0 12px;
  border: 1px solid var(--dg-line); border-radius: var(--dg-r-pill);
  background: var(--dg-bg); color: var(--dg-text-2);
  font-size: var(--dg-fs-xs); font-weight: 500; cursor: pointer; white-space: nowrap;
  transition: all var(--dg-dur-2) var(--dg-ease);
}
.dg-binding-chip:hover {
  background: var(--dg-hover); color: var(--dg-text);
  border-color: color-mix(in srgb, var(--dg-accent) 30%, var(--dg-line));
  transform: translateY(-1px); box-shadow: 0 2px 4px rgba(0,0,0,0.06);
}
.dg-binding-chip-active {
  background: color-mix(in srgb, var(--dg-success) 10%, var(--dg-bg));
  border-color: color-mix(in srgb, var(--dg-success) 35%, transparent);
  color: var(--dg-text);
}
.dg-binding-chip-active:hover {
  background: color-mix(in srgb, var(--dg-success) 16%, var(--dg-bg));
  border-color: color-mix(in srgb, var(--dg-success) 50%, transparent);
}
.dg-binding-chip-label {
  max-width: 220px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}

.dg-chip-writable {
  background: color-mix(in srgb, var(--dg-warn) 12%, transparent);
  color: var(--dg-warn); border-radius: var(--dg-r-pill);
  padding: 3px 9px; font-size: var(--dg-fs-xs); font-weight: 500; display: inline-flex; align-items: center; gap: 4px;
}
.dg-chip-readonly {
  background: color-mix(in srgb, var(--dg-accent) 12%, transparent);
  color: var(--dg-accent); border-radius: var(--dg-r-pill);
  padding: 3px 9px; font-size: var(--dg-fs-xs); font-weight: 500; display: inline-flex; align-items: center; gap: 4px;
}

.dg-iconbtn {
  display: inline-flex; align-items: center; justify-content: center;
  width: var(--dg-icon-btn); height: var(--dg-icon-btn);
  border: 1px solid transparent; border-radius: var(--dg-r-xs);
  background: transparent; color: var(--dg-text-2); cursor: pointer; flex: none;
  transition: background var(--dg-dur-1) var(--dg-ease), color var(--dg-dur-1) var(--dg-ease);
}
.dg-iconbtn:hover:not(:disabled) { background: var(--dg-hover); color: var(--dg-text); }
.dg-iconbtn:disabled { opacity: 0.35; cursor: default; }
.dg-iconbtn.dg-btn-active { background: var(--dg-accent-soft); color: var(--dg-text); border-color: transparent; }
.dg-iconbtn-tiny { width: 20px; height: 20px; }

/* shell -------------------------------------------------------------------- */
.dg-body { flex: 1; min-height: 0; display: flex; overflow: hidden; }
.dg-tree {
  display: flex; flex-direction: column; min-width: 0; width: 100%; flex: 1 1 auto;
  border-right: 1px solid var(--dg-line);
  background: var(--dg-surface);
}
.dg-main { flex: 1; min-width: 0; display: flex; flex-direction: column; overflow: hidden; background: var(--dg-bg); }
.dg-split { width: 6px; flex: none; cursor: col-resize; background: transparent; position: relative; z-index: 3; margin: 0 -3px; transition: background var(--dg-dur-1) var(--dg-ease); }
.dg-split:hover, .dg-split:focus-visible { background: var(--dg-accent-line); }

.dg-panehead {
  display: flex; align-items: center; gap: var(--dg-sp-2);
  height: 32px; padding: 0 var(--dg-sp-3);
  border-bottom: 1px solid var(--dg-line);
  background: var(--dg-surface);
  flex: none;
  font-size: var(--dg-fs-xs); font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase;
  color: var(--dg-text-2);
}

/* tree --------------------------------------------------------------------- */
.dg-tree-scroll { flex: 1; min-height: 0; overflow: auto; padding: var(--dg-sp-2) var(--dg-sp-3) var(--dg-sp-5); }
.dg-trow {
  display: flex; align-items: center; gap: var(--dg-sp-2);
  height: 26px; padding: 0 var(--dg-sp-2);
  border-radius: var(--dg-r-xs);
  cursor: pointer; user-select: none; white-space: nowrap;
  transition: background var(--dg-dur-1) var(--dg-ease);
}
.dg-trow:hover { background: var(--dg-hover); }
.dg-trow-active { background: var(--dg-accent-soft); box-shadow: inset 2px 0 0 var(--dg-accent); }
.dg-trow-active:hover { background: color-mix(in srgb, var(--dg-accent) 18%, transparent); }
.dg-trow-db { padding-left: 17px; }
.dg-group {
  display: flex; align-items: center; gap: var(--dg-sp-2);
  height: 26px; padding: 0 var(--dg-sp-2); margin-top: var(--dg-sp-1);
  font-size: var(--dg-fs-xs); font-weight: 600; color: var(--dg-text-2);
  cursor: pointer; user-select: none; border-radius: var(--dg-r-xs);
}
.dg-group:hover { background: var(--dg-hover); color: var(--dg-text); }
.dg-twist { width: 13px; height: 13px; display: inline-flex; align-items: center; justify-content: center; color: var(--dg-text-3); flex: none; transition: transform var(--dg-dur-2) var(--dg-ease); }
.dg-twist-open { transform: rotate(90deg); }
.dg-ticon { display: inline-flex; color: var(--dg-text-3); flex: none; }
.dg-tlabel { overflow: hidden; text-overflow: ellipsis; flex: 1; min-width: 0; }
.dg-colorbar { width: 3px; height: 14px; border-radius: var(--dg-r-pill); flex: none; }
.dg-badge {
  font-size: var(--dg-fs-xs); line-height: 16px; padding: 0 5px;
  border-radius: var(--dg-r-xs);
  background: var(--dg-surface-2); color: var(--dg-text-2);
  flex: none; font-variant-numeric: tabular-nums;
}
.dg-dot { width: 6px; height: 6px; border-radius: 50%; flex: none; background: var(--dsw-alias-state-idle-primary); }
.dg-dot-open { background: var(--dg-success); }
.dg-dot-busy { background: var(--dg-warn); }
.dg-dot-error { background: var(--dg-error); }
.dg-search {
  display: flex; align-items: center; gap: var(--dg-sp-2);
  height: 30px; padding: 0 var(--dg-sp-4);
  border: 1px solid var(--dg-line-soft); border-radius: var(--dg-r-pill);
  background: var(--dg-surface-2); color: var(--dg-text-3); flex: 1; min-width: 0;
  transition: all var(--dg-dur-2) var(--dg-ease);
}
.dg-search:focus-within {
  background: var(--dg-bg);
  border-color: var(--dg-accent);
  box-shadow: 0 0 0 2px var(--dg-accent-soft);
  color: var(--dg-accent);
}
.dg-search input {
  border: 0; outline: none; background: transparent; color: var(--dg-text);
  font: inherit; font-size: var(--dg-fs-xs); flex: 1; min-width: 0; height: 100%;
}
.dg-search input::placeholder { color: var(--dg-text-3); }

/* tabs --------------------------------------------------------------------- */
.dg-tabs {
  display: flex; align-items: stretch; gap: 2px;
  border-bottom: 1px solid var(--dg-line);
  background: var(--dg-surface);
  padding: 4px 6px 0;
  flex: none; overflow-x: auto; scrollbar-width: none;
}
.dg-tabs::-webkit-scrollbar { display: none; }
.dg-tab {
  display: flex; align-items: center; gap: var(--dg-sp-2);
  height: 32px; padding: 0 var(--dg-sp-2) 0 var(--dg-sp-3);
  border: 1px solid transparent; border-bottom: 0;
  border-radius: 8px 8px 0 0;
  background: transparent; color: var(--dg-text-2);
  font-size: var(--dg-fs-sm); cursor: pointer; white-space: nowrap;
  max-width: 220px; position: relative;
  transition: background var(--dg-dur-1) var(--dg-ease), color var(--dg-dur-1) var(--dg-ease);
}
.dg-tab:hover { background: var(--dg-hover); color: var(--dg-text); }
/* Active tab reads continuous with content below with Google top indicator line */
.dg-tab-active {
  background: var(--dg-bg); color: var(--dg-text);
  border-color: var(--dg-line);
  font-weight: 500;
  box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.03);
}
.dg-tab-active::after {
  content: ''; position: absolute; left: 8px; right: 8px; top: 0; height: 2.5px;
  background: var(--dg-accent); border-radius: 0 0 2px 2px;
}
.dg-tab-label { overflow: hidden; text-overflow: ellipsis; }
.dg-tab-close {
  display: inline-flex; align-items: center; justify-content: center;
  width: 20px; height: 20px; margin-left: 2px;
  border: 0; border-radius: 50%;
  background: transparent; color: var(--dg-text-3); cursor: pointer; flex: none;
  transition: all var(--dg-dur-1) var(--dg-ease);
}
.dg-tab-close:hover, .dg-tab-close:focus-visible {
  background: var(--dg-pressed); color: var(--dg-text);
}

.dg-content { flex: 1; min-height: 0; display: flex; flex-direction: column; overflow: hidden; position: relative; }
/* Wraps instead of clipping: an unreachable button is worse than a second line. */
.dg-subbar {
  display: flex; align-items: center; flex-wrap: wrap; gap: var(--dg-sp-2) var(--dg-sp-3);
  min-height: 32px; padding: var(--dg-sp-1) var(--dg-sp-4);
  border-bottom: 1px solid var(--dg-line-soft);
  background: var(--dg-surface);
  flex: none; font-size: var(--dg-fs-xs); color: var(--dg-text-2);
}
.dg-chip {
  display: inline-flex; align-items: center; gap: var(--dg-sp-1);
  height: 20px; padding: 0 var(--dg-sp-3);
  border-radius: var(--dg-r-pill);
  background: var(--dg-surface-2); color: var(--dg-text-2);
  font-size: var(--dg-fs-xs); white-space: nowrap; font-variant-numeric: tabular-nums;
}
.dg-chip b { color: var(--dg-text); font-weight: 600; }
.dg-tag {
  font-size: var(--dg-fs-xs); padding: 0 5px; border-radius: var(--dg-r-xs);
  background: var(--dg-surface-2); color: var(--dg-text-2);
  line-height: 17px; text-transform: uppercase; letter-spacing: 0.03em; white-space: nowrap;
}
.dg-tag-strong { background: var(--dg-accent-soft); color: var(--dg-text); font-weight: 600; }

/* segmented control -------------------------------------------------------- */
.dg-seg { display: inline-flex; align-items: center; border: 1px solid var(--dg-line); border-radius: var(--dg-r-sm); overflow: hidden; flex: none; background: var(--dg-bg); }
.dg-seg button {
  height: var(--dg-ctl-sm); padding: 0 var(--dg-sp-4);
  border: 0; border-right: 1px solid var(--dg-line-soft);
  background: transparent; color: var(--dg-text-2);
  font-size: var(--dg-fs-xs); cursor: pointer;
  transition: background var(--dg-dur-1) var(--dg-ease), color var(--dg-dur-1) var(--dg-ease);
}
.dg-seg button:last-child { border-right: 0; }
.dg-seg button:hover { background: var(--dg-hover); color: var(--dg-text); }
.dg-seg button.dg-seg-on { background: var(--dg-accent-soft); color: var(--dg-text); font-weight: 600; }

/* data grid ---------------------------------------------------------------- */
.dg-grid-wrap { flex: 1; min-height: 0; overflow: auto; position: relative; }
.dg-grid { border-collapse: separate; border-spacing: 0; font-size: var(--dg-fs-sm); min-width: 100%; }
.dg-grid th,
.dg-grid td {
  border-bottom: 1px solid var(--dg-line-cell);
  border-right: 1px solid var(--dg-line-cell);
  padding: 0 var(--dg-sp-4);
  height: var(--dg-row); text-align: left;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis; vertical-align: middle;
}
.dg-grid th {
  position: sticky; top: 0; z-index: 3;
  background: var(--dg-surface);
  font-weight: 600; font-size: var(--dg-fs-xs); color: var(--dg-text-2);
  cursor: pointer; user-select: none; padding-right: 2px;
}
.dg-grid th.dg-th-sorted { color: var(--dg-text); }
.dg-grid td { font-family: var(--dg-mono); font-size: var(--dg-fs-sm); }
.dg-grid td.dg-cell-num { text-align: right; font-variant-numeric: tabular-nums; }
.dg-grid tbody tr:nth-child(even) td { background: var(--dg-zebra); }
.dg-grid tbody tr:hover td { background: var(--dg-hover); }
.dg-grid td.dg-cell-selected,
.dg-grid tbody tr:hover td.dg-cell-selected {
  background: var(--dg-accent-soft);
  box-shadow: inset 0 0 0 1px var(--dg-accent-line);
}
.dg-grid .dg-null { color: var(--dg-text-2); font-style: italic; }
.dg-grid .dg-cell-editing { padding: 0; }
.dg-grid .dg-cell-editing input {
  width: 100%; height: 100%; min-height: 24px;
  border: 1px solid var(--dg-accent); border-radius: var(--dg-r-xs);
  background: var(--dg-bg); color: var(--dg-text);
  font: inherit; padding: 0 var(--dg-sp-3); outline: none;
}
.dg-grid th.dg-rownum,
.dg-grid td.dg-rownum {
  width: 46px; min-width: 46px; text-align: right;
  color: var(--dg-text-2); font-size: var(--dg-fs-xs);
  padding-right: var(--dg-sp-4); font-family: var(--dg-mono); font-variant-numeric: tabular-nums;
}
/* The row-number cell opens the row editor, so it has to look like a control. */
.dg-rownum-editable { cursor: pointer; }
.dg-rownum-editable:hover { color: var(--dg-accent); background: var(--dg-accent-soft); }
.dg-colkey { display: inline-flex; align-items: center; margin-left: var(--dg-sp-1); color: var(--dg-accent); vertical-align: -2px; }
.dg-sortmark { color: var(--dg-accent); font-size: 10px; margin-left: var(--dg-sp-1); }
.dg-colresize { position: absolute; right: 0; top: 0; bottom: 0; width: 5px; cursor: col-resize; }
.dg-colresize:hover { background: var(--dg-accent); }

.dg-pager {
  display: flex; align-items: center; gap: var(--dg-sp-4);
  padding: var(--dg-sp-1) var(--dg-sp-4);
  border-top: 1px solid var(--dg-line);
  background: var(--dg-surface);
  flex: none; font-size: var(--dg-fs-xs); color: var(--dg-text-2);
}
.dg-pager .dg-input { height: var(--dg-ctl-sm); width: auto; padding: 0 var(--dg-sp-1); }
.dg-status {
  display: flex; align-items: center; gap: var(--dg-sp-4);
  height: 26px; padding: 0 var(--dg-sp-4);
  border-top: 1px solid var(--dg-line);
  background: var(--dg-surface);
  flex: none; font-size: var(--dg-fs-xs); color: var(--dg-text-2);
  overflow: hidden; white-space: nowrap;
}
.dg-status-item { display: inline-flex; align-items: center; gap: var(--dg-sp-1); min-width: 0; }
.dg-status b { color: var(--dg-text); font-weight: 600; }

/* list tables -------------------------------------------------------------- */
.dg-list { width: 100%; border-collapse: separate; border-spacing: 0; font-size: var(--dg-fs-sm); }
.dg-list th {
  position: sticky; top: 0; z-index: 2;
  height: 30px; padding: 0 var(--dg-sp-4);
  text-align: left; font-weight: 600; font-size: var(--dg-fs-xs);
  letter-spacing: 0.04em; text-transform: uppercase; color: var(--dg-text-2);
  background: var(--dg-surface); border-bottom: 1px solid var(--dg-line);
  cursor: pointer; user-select: none; white-space: nowrap;
}
.dg-list td {
  height: var(--dg-row); padding: 0 var(--dg-sp-4);
  border-bottom: 1px solid var(--dg-line-cell);
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.dg-list tbody tr { cursor: pointer; transition: background var(--dg-dur-1) var(--dg-ease); }
.dg-list tbody tr:hover td { background: var(--dg-hover); }
.dg-list tbody tr.dg-row-active td { background: var(--dg-accent-soft); }
.dg-list .dg-num { text-align: right; font-variant-numeric: tabular-nums; color: var(--dg-text-2); }
.dg-list-name { display: flex; align-items: center; gap: var(--dg-sp-2); }

/* forms -------------------------------------------------------------------- */
.dg-input {
  height: var(--dg-ctl); padding: 0 var(--dg-sp-3);
  border: 1px solid var(--dg-line); border-radius: var(--dg-r-xs);
  background: var(--dg-bg); color: var(--dg-text);
  font: inherit; font-size: var(--dg-fs-sm); outline: none; min-width: 0;
  transition: border-color var(--dg-dur-1) var(--dg-ease), box-shadow var(--dg-dur-1) var(--dg-ease);
}
.dg-input:focus { border-color: var(--dg-accent); box-shadow: 0 0 0 3px var(--dg-accent-soft); }
.dg-input::placeholder { color: var(--dg-text-3); }
/* Multi-line variant of the same field: rows instead of a fixed height, and the
   monospace stack because these carry JSON, SQL or notes. */
.dg-textarea { height: auto; min-height: 62px; padding: var(--dg-sp-2) var(--dg-sp-3); line-height: var(--dg-lh-body); resize: vertical; font-family: var(--dg-mono); font-size: var(--dg-fs-sm); }
textarea.dg-input { height: auto; padding: var(--dg-sp-3) var(--dg-sp-3); resize: vertical; font-family: var(--dg-mono); line-height: var(--dg-lh-body); }
.dg-select { padding-right: var(--dg-sp-1); }
.dg-field { display: flex; flex-direction: column; gap: var(--dg-sp-1); min-width: 0; }
.dg-field-wide { grid-column: 1 / -1; }
.dg-field-label { font-size: var(--dg-fs-xs); color: var(--dg-text-2); }
.dg-field-hint { font-size: var(--dg-fs-xs); color: var(--dg-text-2); line-height: var(--dg-lh-tight); }
.dg-form { display: grid; grid-template-columns: 1fr 1fr; gap: var(--dg-sp-5); }

.dg-engines { display: grid; grid-template-columns: repeat(auto-fit, minmax(128px, 1fr)); gap: var(--dg-sp-2); }
.dg-engine {
  display: flex; flex-direction: column; gap: var(--dg-sp-1); align-items: flex-start;
  padding: var(--dg-sp-3) var(--dg-sp-4);
  border: 1px solid var(--dg-line); border-radius: var(--dg-r-md);
  background: var(--dg-bg); cursor: pointer;
  font-size: var(--dg-fs-sm); color: var(--dg-text); text-align: left;
  transition: background var(--dg-dur-1) var(--dg-ease), border-color var(--dg-dur-1) var(--dg-ease);
}
.dg-engine:hover:not(:disabled) { background: var(--dg-hover); }
.dg-engine-active { border-color: var(--dg-accent); background: var(--dg-accent-soft); }
.dg-engine:disabled { opacity: 0.45; cursor: not-allowed; }
.dg-engine-note { font-size: var(--dg-fs-xs); color: var(--dg-text-2); white-space: normal; line-height: var(--dg-lh-tight); }

/* overlays ----------------------------------------------------------------- */
.dg-backdrop {
  position: fixed; inset: 0; z-index: 60;
  display: flex; align-items: center; justify-content: center;
  background: var(--dg-mask);
  backdrop-filter: blur(2px);
  padding: var(--dg-sp-5);
  animation: dg-fade-in 140ms cubic-bezier(0, 0, 0.2, 1);
}
@keyframes dg-fade-in { from { opacity: 0; } to { opacity: 1; } }

.dg-modal {
  display: flex; flex-direction: column; max-height: 88vh;
  /* The dialog width is set by the caller; the cap keeps it usable when the
     host panel is narrower than that width. */
  width: 100%; max-width: 100%;
  border-radius: 20px;
  background: var(--dg-bg);
  border: 1px solid var(--dg-line);
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.18), 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  animation: dg-scale-up 180ms cubic-bezier(0.1, 0.9, 0.2, 1);
}
@keyframes dg-scale-up { from { opacity: 0; transform: scale(0.96) translateY(6px); } to { opacity: 1; transform: scale(1) translateY(0); } }

.dg-modal-head {
  display: flex; align-items: center; justify-content: space-between; gap: var(--dg-sp-3);
  padding: 16px 20px;
  border-bottom: 1px solid var(--dg-line);
  background: var(--dg-surface);
  flex: none;
}
.dg-modal-title-wrap {
  display: flex; align-items: center; gap: 12px;
  flex: 1; min-width: 0;
}
.dg-modal-icon-badge {
  display: inline-flex; align-items: center; justify-content: center;
  width: 32px; height: 32px; border-radius: 10px;
  background: color-mix(in srgb, var(--dg-accent) 14%, transparent);
  color: var(--dg-accent);
  flex: none;
}
.dg-modal-title {
  font-weight: 600; font-size: 15px; color: var(--dg-text);
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.dg-modal-subtitle {
  font-size: var(--dg-fs-xs); color: var(--dg-text-2); margin-top: 2px;
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.dg-modal-body {
  padding: 20px; overflow: auto; min-height: 0;
  display: flex; flex-direction: column; gap: var(--dg-sp-4);
}
.dg-modal-foot {
  display: flex; align-items: center; justify-content: flex-end; gap: var(--dg-sp-2);
  padding: 14px 20px;
  border-top: 1px solid var(--dg-line);
  background: var(--dg-surface);
  flex: none; flex-wrap: wrap;
}
.dg-ctxmenu {
  position: fixed; z-index: 80; min-width: 176px; padding: var(--dg-sp-1);
  border-radius: var(--dg-r-md);
  background: var(--dg-bg);
  border: 1px solid var(--dg-line);
  box-shadow: var(--dg-elev-2);
}
.dg-ctxitem {
  display: flex; align-items: center; gap: var(--dg-sp-3);
  width: 100%; height: var(--dg-ctl); padding: 0 var(--dg-sp-3);
  border: 0; border-radius: var(--dg-r-xs); background: transparent;
  color: var(--dg-text); font-size: var(--dg-fs-sm); cursor: pointer; text-align: left;
}
.dg-ctxitem:hover:not(:disabled) { background: var(--dg-hover); }
.dg-ctxitem:disabled { opacity: 0.45; cursor: default; }
.dg-ctxitem-danger { color: var(--dg-error); }
.dg-ctxhint { margin-left: auto; font-size: var(--dg-fs-xs); color: var(--dg-text-2); }
.dg-ctxsep { height: 1px; margin: var(--dg-sp-1) var(--dg-sp-3); background: var(--dg-line); }

/* banners: the state is carried by the icon and a left rule, never by tinted
   text, which would not survive both themes at 4.5:1. */
.dg-banner {
  display: flex; align-items: flex-start; gap: var(--dg-sp-2);
  padding: var(--dg-sp-2) var(--dg-sp-4);
  margin: var(--dg-sp-3) var(--dg-sp-4) 0;
  border: 1px solid var(--dg-line-soft);
  border-left: 3px solid var(--dg-line);
  border-radius: var(--dg-r-sm);
  background: var(--dg-surface);
  font-size: var(--dg-fs-xs); line-height: var(--dg-lh-body);
  flex: none;
}
.dg-banner > svg { flex: none; margin-top: 2px; color: var(--dg-text-2); }
.dg-banner-text { flex: 1; min-width: 0; overflow-wrap: anywhere; }
.dg-banner-error { border-left-color: var(--dg-error); background: var(--dg-error-soft); }
.dg-banner-error > svg { color: var(--dg-error); }
.dg-banner-success { border-left-color: var(--dg-success); background: var(--dg-success-soft); }
.dg-banner-success > svg { color: var(--dg-success); }

.dg-empty {
  flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: var(--dg-sp-2); padding: var(--dg-sp-6); text-align: center; color: var(--dg-text-3);
  user-select: none;
}
/* Placeholder-like empty title: subtle, regular weight, muted placeholder color */
.dg-empty-title {
  font-size: 13px;
  font-weight: 400;
  color: var(--dg-text-3);
  letter-spacing: normal;
  line-height: var(--dg-lh-body);
}
.dg-empty-hint {
  font-size: var(--dg-fs-xs);
  max-width: 440px;
  line-height: var(--dg-lh-body);
  color: var(--dg-text-3);
  opacity: 0.85;
}
.dg-welcome-actions {
  display: flex; align-items: center; gap: var(--dg-sp-3); margin-top: var(--dg-sp-4);
  flex-wrap: wrap; justify-content: center;
}

/* categorized saved queries ------------------------------------------------ */
.dg-query-category {
  border: 1px solid var(--dg-line);
  border-radius: var(--dg-r-md);
  background: var(--dg-surface);
  overflow: hidden;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
}
.dg-query-category-head {
  display: flex;
  align-items: center;
  gap: var(--dg-sp-2);
  padding: 8px 12px;
  background: var(--dg-surface-2);
  border-bottom: 1px solid var(--dg-line);
  font-size: var(--dg-fs-xs);
  color: var(--dg-text);
}
.dg-query-category-icon {
  display: inline-flex;
  align-items: center;
  color: var(--dg-accent);
}
.dg-query-category-title {
  font-weight: 600;
  font-size: var(--dg-fs-sm);
  color: var(--dg-text);
}
.dg-query-category-sep {
  color: var(--dg-text-3);
  margin: 0 2px;
}
.dg-query-category-db {
  font-family: var(--dg-mono);
  font-weight: 500;
  color: var(--dg-text-2);
}

.dg-spinner-row { display: inline-flex; align-items: center; gap: var(--dg-sp-1); font-size: var(--dg-fs-xs); color: var(--dg-text-2); }
.dg-spinner { width: 12px; height: 12px; border: 2px solid color-mix(in srgb, var(--dg-text-2) 30%, transparent); border-top-color: var(--dg-accent); border-radius: 50%; animation: dg-spin 0.7s linear infinite; flex: none; }
@keyframes dg-spin { to { transform: rotate(360deg); } }

.dg-toast {
  position: absolute; right: var(--dg-sp-5); bottom: 34px; z-index: 30;
  display: flex; align-items: center; gap: var(--dg-sp-2);
  max-width: min(480px, 70%); padding: var(--dg-sp-2) var(--dg-sp-4);
  border-radius: var(--dg-r-sm);
  border: 1px solid var(--dg-line);
  border-left: 3px solid var(--dg-success);
  background: var(--dg-bg);
  box-shadow: var(--dg-elev-2);
  font-size: var(--dg-fs-xs);
}
.dg-toast > svg { color: var(--dg-success); flex: none; }
.dg-toast-error { border-left-color: var(--dg-error); }
.dg-toast-error > svg { color: var(--dg-error); }

/* sql console -------------------------------------------------------------- */
.dg-sql { flex: 1; min-height: 0; display: flex; flex-direction: column; }
.dg-sql-top { display: flex; flex-direction: column; border-bottom: 1px solid var(--dg-line); min-height: 132px; flex: none; }
.dg-editor { display: flex; min-height: 132px; max-height: 46vh; position: relative; flex: 1; }
.dg-editor:focus-within { box-shadow: inset 0 0 0 1px var(--dg-accent-line); }
.dg-gutter {
  flex: none; width: 40px; padding: var(--dg-sp-4) var(--dg-sp-3) var(--dg-sp-4) 0;
  text-align: right;
  font-family: var(--dg-mono); font-size: var(--dg-fs-xs); line-height: 1.6;
  overflow: hidden; user-select: none;
  border-right: 1px solid var(--dg-line-soft);
  color: var(--dg-text-2);
}
.dg-code { position: relative; flex: 1; min-width: 0; overflow: hidden; }
.dg-hl, .dg-sql-text {
  margin: 0; padding: var(--dg-sp-4) var(--dg-sp-4);
  font-family: var(--dg-mono); font-size: var(--dg-fs-sm); line-height: 1.6;
  tab-size: 2; white-space: pre; word-wrap: normal;
}
.dg-hl { position: absolute; inset: 0; overflow: auto; color: var(--dg-text); pointer-events: none; scrollbar-width: none; }
.dg-hl::-webkit-scrollbar { display: none; }
.dg-sql-text {
  position: absolute; inset: 0; width: 100%; height: 100%;
  border: 0; outline: none; resize: none; background: transparent; color: transparent;
  -webkit-text-fill-color: transparent; caret-color: var(--dg-text); overflow: auto;
}
.dg-sql-text::selection { background: color-mix(in srgb, var(--dg-accent) 32%, transparent); -webkit-text-fill-color: transparent; }
/* Syntax colours: the host highlighter palette, adjusted for text contrast in
   the token block above. The previous hard-coded hex values were a dark-mode
   palette and painted identifiers white on white. */
.dg-tok { color: var(--dg-code-plain); }
.dg-tok-keyword { color: var(--dg-code-keyword); font-weight: 600; }
.dg-tok-function { color: var(--dg-code-function); }
.dg-tok-string { color: var(--dg-code-string); }
.dg-tok-number { color: var(--dg-code-number); }
.dg-tok-comment { color: var(--dg-code-comment); font-style: italic; }
.dg-tok-operator { color: var(--dg-code-operator); }
.dg-tok-punct { color: var(--dg-code-punct); }
.dg-tok-variable { color: var(--dg-code-variable); }
.dg-tok-ident { color: var(--dg-code-plain); }

.dg-sqlbar {
  display: flex; align-items: center; gap: var(--dg-sp-1) var(--dg-sp-2);
  padding: var(--dg-sp-3) var(--dg-sp-4);
  border-top: 1px solid var(--dg-line);
  background: var(--dg-surface);
  flex: none;
  /* Wraps for the same reason the toolbar does: \`nowrap\` + \`overflow: hidden\`
     silently cut the trailing controls off on a narrow panel. */
  flex-wrap: wrap;
}
.dg-complete {
  position: absolute; z-index: 40; min-width: 180px; max-width: 320px; max-height: 220px;
  overflow: auto; padding: var(--dg-sp-1);
  border-radius: var(--dg-r-sm);
  background: var(--dg-bg);
  border: 1px solid var(--dg-line);
  box-shadow: var(--dg-elev-2);
  font-family: var(--dg-mono); font-size: var(--dg-fs-xs);
}
.dg-complete-item { display: flex; align-items: center; gap: var(--dg-sp-3); height: var(--dg-ctl-sm); padding: 0 var(--dg-sp-2); border-radius: var(--dg-r-xs); cursor: pointer; white-space: nowrap; }
.dg-complete-item:hover, .dg-complete-item-on { background: var(--dg-accent-soft); }
.dg-complete-kind { font-size: var(--dg-fs-xs); color: var(--dg-text-2); margin-left: auto; padding-left: var(--dg-sp-4); text-transform: uppercase; }

.dg-rtabs { display: flex; align-items: center; gap: var(--dg-sp-1); padding: var(--dg-sp-1) var(--dg-sp-3); border-bottom: 1px solid var(--dg-line); flex: none; overflow-x: auto; background: var(--dg-surface); }
.dg-rtab {
  display: inline-flex; align-items: center; gap: var(--dg-sp-1);
  height: var(--dg-ctl-sm); padding: 0 var(--dg-sp-3);
  border: 1px solid transparent; border-radius: var(--dg-r-xs);
  background: transparent; color: var(--dg-text-2); font-size: var(--dg-fs-xs);
  cursor: pointer; white-space: nowrap;
}
.dg-rtab:hover { background: var(--dg-hover); }
.dg-rtab-active { background: var(--dg-bg); color: var(--dg-text); border-color: var(--dg-line); }

/* The result area is the flex child that has to absorb the leftover height;
   without this rule the table overflowed the panel instead of scrolling. */
.dg-results { flex: 1; min-height: 0; display: flex; flex-direction: column; overflow: hidden; }
.dg-sqlmsg { padding: var(--dg-sp-4) var(--dg-sp-5); font-size: var(--dg-fs-sm); color: var(--dg-text-2); white-space: pre-wrap; overflow-wrap: anywhere; }
.dg-err {
  font-family: var(--dg-mono); font-size: var(--dg-fs-xs); line-height: var(--dg-lh-body);
  padding: var(--dg-sp-3) var(--dg-sp-4);
  border-radius: var(--dg-r-xs);
  border-left: 3px solid var(--dg-error);
  background: var(--dg-error-soft);
  color: var(--dg-text);
  white-space: pre-wrap; overflow-wrap: anywhere;
}
.dg-pre { margin: 0; font-family: var(--dg-mono); font-size: var(--dg-fs-xs); line-height: var(--dg-lh-body); white-space: pre-wrap; overflow-wrap: anywhere; color: var(--dg-text); }

/* structure ---------------------------------------------------------------- */
.dg-struct { flex: 1; min-height: 0; display: flex; overflow: hidden; }
.dg-struct-col { flex: 1; min-width: 0; display: flex; flex-direction: column; border-right: 1px solid var(--dg-line); }
.dg-struct-col:last-child { border-right: 0; }
/* The three panes do not deserve equal thirds: the field table needs room for
   four columns, the index list holds short rows, and the DDL needs the rest. */
.dg-struct-col-fields { flex: 1.6 1 0; }
.dg-struct-col-indexes { flex: 0.85 1 0; }
.dg-struct-col-ddl { flex: 1.55 1 0; }
.dg-grid-fixed { table-layout: fixed; }
.dg-struct-head {
  display: flex; align-items: center; gap: var(--dg-sp-2);
  padding: var(--dg-sp-2) var(--dg-sp-4);
  font-size: var(--dg-fs-xs); font-weight: 600;
  letter-spacing: 0.04em; text-transform: uppercase; color: var(--dg-text-2);
  border-bottom: 1px solid var(--dg-line); flex: none; background: var(--dg-surface);
}
.dg-struct-body { flex: 1; min-height: 0; overflow: auto; padding: var(--dg-sp-3) var(--dg-sp-4); }
.dg-idx { display: flex; align-items: center; gap: var(--dg-sp-2); padding: var(--dg-sp-1) 0; font-size: var(--dg-fs-xs); flex-wrap: wrap; border-bottom: 1px solid var(--dg-line-cell); }

/* redis -------------------------------------------------------------------- */
.dg-redis { flex: 1; min-height: 0; display: flex; }
.dg-redis-list {
  width: 300px; flex: none; display: flex; flex-direction: column;
  border-right: 1px solid var(--dg-line);
  min-width: 0; background: var(--dg-surface);
}
.dg-redis-keys { flex: 1; min-height: 0; overflow: auto; padding: var(--dg-sp-2) var(--dg-sp-3); }
.dg-rkey {
  display: flex; align-items: center; gap: var(--dg-sp-2);
  height: 26px; padding: 0 var(--dg-sp-2); border-radius: var(--dg-r-xs);
  cursor: pointer; font-size: var(--dg-fs-xs); font-family: var(--dg-mono);
}
.dg-rkey:hover { background: var(--dg-hover); }
.dg-rkey-active { background: var(--dg-accent-soft); box-shadow: inset 2px 0 0 var(--dg-accent); }
.dg-rns { display: flex; align-items: center; gap: var(--dg-sp-2); height: 24px; padding: 0 var(--dg-sp-2); cursor: pointer; font-size: var(--dg-fs-xs); color: var(--dg-text-2); font-weight: 600; border-radius: var(--dg-r-xs); }
.dg-rns:hover { background: var(--dg-hover); color: var(--dg-text); }
.dg-redis-detail { flex: 1; min-width: 0; display: flex; flex-direction: column; }
.dg-redis-console { border-top: 1px solid var(--dg-line); flex: none; padding: var(--dg-sp-3) var(--dg-sp-4); display: flex; flex-direction: column; gap: var(--dg-sp-2); background: var(--dg-surface); }

/* overview ----------------------------------------------------------------- */
.dg-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(148px, 1fr)); gap: var(--dg-sp-4); padding: var(--dg-sp-5); }
.dg-card {
  border: 1px solid var(--dg-line); border-radius: var(--dg-r-md);
  padding: var(--dg-sp-4) var(--dg-sp-5);
  background: var(--dg-surface);
  display: flex; flex-direction: column; gap: var(--dg-sp-1);
  transition: border-color var(--dg-dur-1) var(--dg-ease), background var(--dg-dur-1) var(--dg-ease);
}
.dg-card:hover { border-color: var(--dg-accent-line); }
.dg-card-value { font-size: var(--dg-fs-lg); font-weight: 600; font-variant-numeric: tabular-nums; color: var(--dg-text); }
.dg-card-label { font-size: var(--dg-fs-xs); text-transform: uppercase; letter-spacing: 0.04em; color: var(--dg-text-2); }
.dg-section { padding: var(--dg-sp-1) var(--dg-sp-5) var(--dg-sp-5); display: flex; flex-direction: column; gap: var(--dg-sp-3); }
.dg-section-title { font-size: var(--dg-fs-xs); font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; color: var(--dg-text-2); }

/* engine marks and tag rows ------------------------------------------------ */
.dg-logo { display: inline-flex; align-items: center; justify-content: center; border-radius: var(--dg-r-sm); flex: none; }
.dg-engine-head { display: flex; align-items: center; gap: var(--dg-sp-3); }
.dg-engine-name { font-weight: 600; }
.dg-tags { display: flex; flex-wrap: wrap; gap: var(--dg-sp-1); margin-top: var(--dg-sp-1); }
.dg-summary { margin: var(--dg-sp-1) 0 0; }
.dg-form-section { display: flex; flex-direction: column; gap: var(--dg-sp-3); border-top: 1px solid var(--dg-line-soft); padding-top: var(--dg-sp-4); }
.dg-colors { display: flex; align-items: center; gap: var(--dg-sp-3); flex-wrap: wrap; }
.dg-swatch {
  width: 22px; height: 22px; border-radius: 50%;
  border: 1px solid var(--dg-line); cursor: pointer;
  display: inline-flex; align-items: center; justify-content: center;
  color: #fff; padding: 0;
  transition: box-shadow var(--dg-dur-1) var(--dg-ease);
}
.dg-swatch-none { color: var(--dg-text); }
.dg-swatch-on { box-shadow: 0 0 0 2px var(--dg-bg), 0 0 0 4px var(--dg-accent); }

/* workspace binding rows --------------------------------------------------- */
.dg-ws-row {
  border: 1px solid var(--dg-line);
  border-radius: 14px;
  padding: 14px 16px;
  display: flex; flex-direction: column; gap: 10px;
  background: var(--dg-surface);
  transition: all var(--dg-dur-2) var(--dg-ease);
}
.dg-ws-row:hover {
  border-color: color-mix(in srgb, var(--dg-accent) 30%, var(--dg-line));
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}
.dg-ws-head { display: flex; align-items: center; gap: 10px; min-width: 0; }
.dg-ws-icon {
  display: inline-flex; align-items: center; justify-content: center;
  width: 30px; height: 30px; border-radius: 8px;
  background: var(--dg-surface-2); color: var(--dg-accent); flex: none;
}
.dg-ws-title { font-weight: 600; font-size: 13px; color: var(--dg-text); }
.dg-ws-path {
  color: var(--dg-text-2); font-size: 11px;
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  font-family: var(--dg-mono); opacity: 0.85; margin-top: 2px;
}
.dg-status-badge {
  display: inline-flex; align-items: center; gap: 5px;
  height: 22px; padding: 0 10px;
  border-radius: var(--dg-r-pill);
  font-size: 11px; font-weight: 500;
  background: var(--dg-surface-2); color: var(--dg-text-2);
  border: 1px solid var(--dg-line-soft);
  white-space: nowrap; flex: none;
}
.dg-status-badge-ok {
  background: color-mix(in srgb, var(--dg-success) 12%, transparent);
  color: var(--dg-success);
  border-color: color-mix(in srgb, var(--dg-success) 30%, transparent);
}
.dg-tag-accent {
  background: color-mix(in srgb, var(--dg-accent) 12%, transparent);
  color: var(--dg-accent);
}
/* Two fields side by side, with the actions on their own row */
.dg-ws-form {
  display: grid; grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr);
  gap: var(--dg-sp-3) var(--dg-sp-4); align-items: end;
  margin-top: 4px;
}
.dg-ws-actions { grid-column: 1 / -1; display: flex; gap: var(--dg-sp-2); justify-content: flex-end; margin-top: 2px; }

@media (max-width: 720px) {
  .dg-ws-form { grid-template-columns: minmax(0, 1fr); }
  .dg-form { grid-template-columns: minmax(0, 1fr); }
  .dg-backdrop { padding: var(--dg-sp-3); }
}

/* Motion is feedback, not decoration: drop it when the user asks for less. */
@media (prefers-reduced-motion: reduce) {
  .dg-root *,
  .dg-backdrop *,
  .dg-ctxmenu * {
    transition-duration: 1ms !important;
    animation-duration: 1ms !important;
    animation-iteration-count: 1 !important;
  }
}
`;var $e=require("react");var I=require("react/jsx-runtime"),In={mysql:{color:"#e48e00",glyph:"cylinder"},postgres:{color:"#336791",glyph:"cylinder"},sqlite:{color:"#0f80cc",glyph:"file"},sqlserver:{color:"#cc2927",glyph:"cylinder"},redis:{color:"#dc382d",glyph:"layers"}},Rn={mysql:["TCP",":3306","mysql2"],postgres:["TCP",":5432","pg"],sqlite:["file","built-in"],sqlserver:["TDS",":1433","mssql"],redis:["TCP",":6379","ioredis"]},Tn=[{value:"none",color:"var(--dsw-alias-border-l2)"},{value:"green",color:"var(--dsw-alias-state-success-primary)"},{value:"yellow",color:"var(--dsw-alias-state-warn-primary)"},{value:"red",color:"var(--dsw-alias-state-error-primary)"}];function Mn({engine:t,size:e=26}){let n=In[t]??{color:"#6b7280",glyph:"cylinder"},a=n.glyph==="layers"?"M12 4l7 3.5-7 3.5-7-3.5zM5 12l7 3.5 7-3.5M5 16.5l7 3.5 7-3.5":n.glyph==="file"?"M7 3h7l4 4v14H7zM10 12h5M10 16h5":"M12 4c3.9 0 6 1.1 6 2.5S15.9 9 12 9 6 7.9 6 6.5 8.1 4 12 4zM6 6.5v11c0 1.4 2.1 2.5 6 2.5s6-1.1 6-2.5v-11";return(0,I.jsx)("span",{className:"dg-logo",style:{width:e,height:e,background:n.color},"aria-hidden":!0,children:(0,I.jsx)("svg",{width:e*.68,height:e*.68,viewBox:"0 0 24 24",fill:"none",stroke:"#fff",strokeWidth:1.8,strokeLinecap:"round",strokeLinejoin:"round",children:(0,I.jsx)("path",{d:a})})})}function Vt(t){let{t:e,engines:n}=t,a=t.initial,[l,i]=(0,$e.useState)(a?.engine??"sqlite"),[d,u]=(0,$e.useState)(()=>({name:a?.name??"",group:a?.group??"",host:a?.host||"127.0.0.1",port:a?.port?String(a.port):"",user:a?.user??"",password:"",database:a?.database??"",file:a?.file??"",redisDb:String(a?.redisDb??0),sslMode:a?.sslMode??"disable",color:a?.color??"none"})),[v,h]=(0,$e.useState)(null),[L,D]=(0,$e.useState)(!1),[P,x]=(0,$e.useState)(!1),[F,z]=(0,$e.useState)(""),Q=n.find(k=>k.id===l),A=L||P,N=k=>U=>u(re=>({...re,[k]:U.target.value})),j=()=>{let k={name:d.name.trim(),engine:l,group:d.group.trim(),host:d.host.trim(),port:Number.parseInt(d.port,10)||Q?.defaultPort||0,user:d.user.trim(),database:d.database.trim(),file:d.file.trim(),redisDb:Number.parseInt(d.redisDb,10)||0,sslMode:d.sslMode,color:d.color};return(d.password!==""||!a?.hasPassword)&&(k.password=d.password),k},Y=async()=>{D(!0),h(null),z("");try{let k=await H.testDraft(j(),a?.id);h({ok:!0,text:ve(e("testOk"),{version:k.serverVersion??"",ms:k.latencyMs??0})})}catch(k){h({ok:!1,text:ve(e("testFailed"),{error:k instanceof Error?k.message:String(k)})})}finally{D(!1)}},V=async()=>{x(!0),z("");try{await t.onSave(j())}catch(k){z(k instanceof Error?k.message:String(k)),x(!1)}},ne=Q?.kind==="file"?d.file.trim():`${d.host||"\u2026"}:${d.port||Q?.defaultPort||"\u2026"}`;return(0,I.jsxs)(Ee,{icon:"database",title:e(a?"edit":"newConnection"),onClose:t.onClose,busy:A,width:620,footer:(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)("span",{className:"dg-muted dg-hint",style:{marginRight:"auto",maxWidth:"54%"},children:v?.text??""}),(0,I.jsxs)(O,{onClick:()=>{Y()},disabled:A,children:[L?(0,I.jsx)(we,{}):null,e("test")]}),(0,I.jsx)(O,{onClick:t.onClose,disabled:A,children:e("cancel")}),(0,I.jsxs)(O,{variant:"primary",onClick:()=>{V()},disabled:A,children:[P?(0,I.jsx)(we,{}):null,e("save")]})]}),children:[(0,I.jsx)("div",{className:"dg-engines",children:n.map(k=>(0,I.jsxs)("button",{type:"button",className:`dg-engine${k.id===l?" dg-engine-active":""}`,onClick:()=>{i(k.id),u(U=>({...U,port:String(k.defaultPort||""),sslMode:"disable"})),h(null)},children:[(0,I.jsxs)("span",{className:"dg-engine-head",children:[(0,I.jsx)(Mn,{engine:k.id,size:24}),(0,I.jsx)("span",{className:"dg-engine-name",children:k.label})]}),(0,I.jsx)("span",{className:"dg-tags",children:(Rn[k.id]??[]).map(U=>(0,I.jsx)("span",{className:"dg-tag",children:U},U))})]},k.id))}),(0,I.jsxs)("div",{className:"dg-tags dg-summary",children:[(0,I.jsx)("span",{className:"dg-tag dg-tag-strong",children:Q?.label??l}),ne?(0,I.jsx)("span",{className:"dg-tag",children:ne}):null,d.database?(0,I.jsx)("span",{className:"dg-tag",children:d.database}):null,d.group?(0,I.jsx)("span",{className:"dg-tag",children:d.group}):null,d.sslMode!=="disable"?(0,I.jsx)("span",{className:"dg-tag",children:"TLS"}):null]}),(0,I.jsxs)("section",{className:"dg-form-section",children:[(0,I.jsx)("div",{className:"dg-section-title",children:e("identity")}),(0,I.jsxs)("div",{className:"dg-form",children:[(0,I.jsx)(ge,{label:e("name"),children:(0,I.jsx)(se,{value:d.name,onChange:N("name"),placeholder:Q?.label})}),(0,I.jsx)(ge,{label:e("group"),children:(0,I.jsx)(se,{value:d.group,onChange:N("group"),placeholder:"dev"})})]}),(0,I.jsxs)("div",{className:"dg-colors",children:[(0,I.jsx)("span",{className:"dg-field-label",children:e("color")}),Tn.map(k=>(0,I.jsx)("button",{type:"button",className:`dg-swatch${k.value==="none"?" dg-swatch-none":""}${d.color===k.value?" dg-swatch-on":""}`,style:{background:k.color},title:k.value,"aria-label":k.value,"aria-pressed":d.color===k.value,onClick:()=>u(U=>({...U,color:k.value})),children:d.color===k.value?(0,I.jsx)(S,{name:"check",size:10}):null},k.value))]})]}),(0,I.jsxs)("section",{className:"dg-form-section",children:[Q?.kind==="file"?null:(0,I.jsx)("div",{className:"dg-section-title",children:e("server")}),Q?.kind==="file"?(0,I.jsx)("div",{className:"dg-form",children:(0,I.jsx)(ge,{label:e("file"),wide:!0,hint:"e.g. D:\\\\data\\\\app.db",children:(0,I.jsx)(se,{value:d.file,onChange:N("file"),placeholder:"C:/data/app.db"})})}):(0,I.jsxs)("div",{className:"dg-form",children:[(0,I.jsx)(ge,{label:e("host"),children:(0,I.jsx)(se,{value:d.host,onChange:N("host")})}),(0,I.jsx)(ge,{label:e("port"),children:(0,I.jsx)(se,{value:d.port,onChange:N("port"),placeholder:String(Q?.defaultPort??"")})}),(0,I.jsx)(ge,{label:e("user"),children:(0,I.jsx)(se,{value:d.user,onChange:N("user")})}),(0,I.jsx)(ge,{label:e("password"),hint:a?.hasPassword?e("passwordKeep"):void 0,children:(0,I.jsx)(se,{type:"password",value:d.password,onChange:N("password"),autoComplete:"new-password"})}),l==="redis"?(0,I.jsx)(ge,{label:e("redisDb"),children:(0,I.jsx)(se,{value:d.redisDb,onChange:N("redisDb"),inputMode:"numeric"})}):(0,I.jsx)(ge,{label:e("database"),children:(0,I.jsx)(se,{value:d.database,onChange:N("database"),placeholder:"optional"})}),(0,I.jsx)(ge,{label:"TLS / SSL",children:(0,I.jsxs)(ke,{value:d.sslMode,onChange:k=>u(U=>({...U,sslMode:k.target.value})),children:[(0,I.jsx)("option",{value:"disable",children:e("sslDisable")}),(0,I.jsx)("option",{value:"require",children:e("sslRequire")}),(0,I.jsx)("option",{value:"verify-ca",children:e("sslVerifyCa")}),(0,I.jsx)("option",{value:"verify-full",children:e("sslVerifyFull")})]})})]})]}),F?(0,I.jsx)(ue,{tone:"error",onClose:()=>z(""),children:F}):null]})}var Xe=require("react");var _=require("react/jsx-runtime");function Ht(t){let{t:e,store:n}=t,a=fe(n.meta),l=fe(n.connections),[i,d]=(0,Xe.useState)({}),[u,v]=(0,Xe.useState)(""),[h,L]=(0,Xe.useState)(""),D=a.meta?.workspaces??[],P=a.meta?.bindings??[],x=N=>P.find(j=>j.workspaceId===N),F=N=>{let j=x(N);return i[N]??{connectionId:j?.connectionId??"",database:j?.database??""}},z=(N,j)=>d(Y=>({...Y,[N]:{...F(N),...j}})),Q=async(N,j)=>{let Y=F(N);if(!Y.connectionId)return L(e("selectConnection"));v(N),L("");try{await H.bindProject({workspaceId:N,workspacePath:j,connectionId:Y.connectionId,database:Y.database}),await n.meta.load();let ne=l.items.find(q=>q.id===Y.connectionId)?.name||Y.connectionId,k=Y.database?` (${Y.database})`:"",re=e("projectBound").replace("{name}",ne).replace("\uFF08{database}\uFF09",k).replace("({database})",k).replace("{database}",Y.database||"");t.notify(re,"success")}catch(V){L(V instanceof Error?V.message:String(V))}finally{v("")}},A=async N=>{v(N);try{await H.unbindProject(N),await n.meta.load(),t.notify(e("unbindProject")+" \u2713","info")}catch(j){L(j instanceof Error?j.message:String(j))}finally{v("")}};return(0,_.jsxs)(Ee,{icon:"link",title:e("workspaces"),subtitle:e("agentHint"),onClose:t.onClose,width:680,footer:(0,_.jsx)(O,{onClick:t.onClose,children:e("close")}),children:[h?(0,_.jsx)(ue,{tone:"error",onClose:()=>L(""),children:h}):null,D.length===0?(0,_.jsx)(ye,{title:e("noWorkspaces")}):(0,_.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:12,maxHeight:"60vh",overflow:"auto",padding:"2px 0"},children:D.map(N=>{let j=x(N.id),Y=F(N.id),V=l.items.find(k=>k.id===Y.connectionId),ne=Y.connectionId?n.connections.session(Y.connectionId).databases:[];return(0,_.jsxs)("div",{className:"dg-ws-row",children:[(0,_.jsxs)("div",{className:"dg-ws-head",children:[(0,_.jsx)("span",{className:"dg-ws-icon",children:(0,_.jsx)(S,{name:"folder",size:14})}),(0,_.jsxs)("div",{className:"dg-truncate",style:{flex:1,minWidth:0},children:[(0,_.jsx)("div",{className:"dg-ws-title",children:N.title}),(0,_.jsx)("div",{className:"dg-ws-path",title:N.path,children:N.path})]}),j?(0,_.jsxs)("span",{className:"dg-status-badge dg-status-badge-ok",children:[(0,_.jsx)("span",{className:"dg-dot dg-dot-open"}),e("boundProject")]}):(0,_.jsx)("span",{className:"dg-status-badge",children:e("projectUnbound")})]}),j?(0,_.jsxs)("div",{className:"dg-tags",style:{marginTop:2,marginBottom:4},children:[(0,_.jsxs)("span",{className:"dg-tag dg-tag-strong",children:[(0,_.jsx)(S,{name:"database",size:10}),j.connectionName||j.connectionId]}),j.database?(0,_.jsx)("span",{className:"dg-tag",children:j.database}):null,(0,_.jsx)("span",{className:"dg-tag dg-tag-accent",children:e("readOnlyForAgent")})]}):null,(0,_.jsxs)("div",{className:"dg-ws-form",children:[(0,_.jsx)(ge,{label:e("connections"),children:(0,_.jsxs)(ke,{value:Y.connectionId,onChange:k=>{let U=k.target.value,re=l.items.find(q=>q.id===U);z(N.id,{connectionId:U,database:re?.database||""})},children:[(0,_.jsx)("option",{value:"",children:"\u2014"}),l.items.map(k=>(0,_.jsxs)("option",{value:k.id,children:[k.name," \xB7 ",k.engine]},k.id))]})}),(0,_.jsx)(ge,{label:e("database"),children:ne.length>0?(0,_.jsxs)(ke,{value:Y.database,onChange:k=>z(N.id,{database:k.target.value}),children:[(0,_.jsx)("option",{value:"",children:V?.database?`${V.database} (default)`:"\u2014"}),ne.map(k=>(0,_.jsx)("option",{value:k.name,children:k.name},k.name))]}):(0,_.jsx)(se,{value:Y.database,placeholder:V?.database||"optional",onChange:k=>z(N.id,{database:k.target.value})})}),(0,_.jsxs)("div",{className:"dg-ws-actions",children:[(0,_.jsxs)(O,{size:"sm",variant:"primary",disabled:u===N.id||!Y.connectionId,onClick:()=>{Q(N.id,N.path)},children:[(0,_.jsx)(S,{name:"link",size:11}),e("bindProject")]}),j?(0,_.jsx)(O,{size:"sm",variant:"ghost",disabled:u===N.id,onClick:()=>{A(N.id)},children:e("unbindProject")}):null]})]})]},N.id)})})]})}var xe=require("react");var s=require("react/jsx-runtime");function Wt(t){let{t:e,store:n}=t,a=fe(n.catalog),l=`${t.connectionId}|${t.database}|${t.schema}`,[i,d]=(0,xe.useState)(""),[u,v]=(0,xe.useState)({column:"name",dir:"asc"});(0,xe.useEffect)(()=>{n.catalog.loadRelations(t.connectionId,t.database,t.schema)},[t.connectionId,t.database,t.schema,n]);let h=(0,xe.useMemo)(()=>{let x=i.trim().toLowerCase();return(a.relations[l]??[]).filter(z=>z.kind===t.kind).filter(z=>x?z.name.toLowerCase().includes(x):!0).sort((z,Q)=>{let A=u.dir==="desc"?-1:1;return u.column==="rows"?((z.rows??0)-(Q.rows??0))*A:u.column==="comment"?(z.comment||"").localeCompare(Q.comment||"")*A:z.name.localeCompare(Q.name)*A})},[a.relations,l,i,t.kind,u]),L=a.loading[l]===!0,D=a.errors[l]??"",P=(x,F,z)=>(0,s.jsxs)("th",{className:z,onClick:()=>v(Q=>Q.column===x?{column:x,dir:Q.dir==="asc"?"desc":"asc"}:{column:x,dir:"asc"}),children:[F,u.column===x?(0,s.jsx)("span",{className:"dg-sortmark",children:u.dir==="desc"?"\u25BC":"\u25B2"}):null]});return(0,s.jsxs)("div",{className:"dg-content",children:[(0,s.jsxs)("div",{className:"dg-subbar",children:[(0,s.jsx)(S,{name:t.kind==="view"?"view":"table",size:12}),(0,s.jsx)("span",{children:t.kind==="view"?e("views"):e("tables")}),(0,s.jsx)("span",{className:"dg-chip",children:h.length}),(0,s.jsx)("div",{className:"dg-spacer"}),(0,s.jsx)(se,{value:i,placeholder:e("search"),style:{width:180},onChange:x=>d(x.target.value)}),t.onNewQuery?(0,s.jsxs)(O,{size:"sm",variant:"tonal",onClick:t.onNewQuery,title:e("newQuery"),children:[(0,s.jsx)(S,{name:"play",size:10}),e("newQuery")]}):null,(0,s.jsx)(oe,{icon:"refresh",title:e("refresh"),onClick:()=>{n.catalog.loadRelations(t.connectionId,t.database,t.schema,!0)}})]}),D?(0,s.jsx)(ue,{tone:"error",children:D}):null,(0,s.jsx)("div",{className:"dg-grid-wrap",children:L?(0,s.jsx)("div",{className:"dg-sqlmsg",children:(0,s.jsx)(we,{label:e("loading")})}):h.length===0?(0,s.jsx)(ye,{title:e("emptyTables")}):(0,s.jsxs)("table",{className:"dg-list",children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[P("name",e("name")),P("rows",e("rows"),"dg-num"),P("comment",e("comment")),(0,s.jsx)("th",{style:{width:70}})]})}),(0,s.jsx)("tbody",{children:h.map(x=>(0,s.jsxs)("tr",{onDoubleClick:()=>t.onOpen(x),children:[(0,s.jsx)("td",{children:(0,s.jsxs)("span",{className:"dg-list-name",children:[(0,s.jsx)(S,{name:x.kind==="view"?"view":"table",size:11}),(0,s.jsx)("span",{className:"dg-mono",children:x.name})]})}),(0,s.jsx)("td",{className:"dg-num",children:x.rows??"\u2014"}),(0,s.jsx)("td",{className:"dg-muted dg-truncate",title:x.comment,children:x.comment}),(0,s.jsx)("td",{children:(0,s.jsxs)("span",{className:"dg-row",style:{gap:2},children:[(0,s.jsx)(oe,{icon:"play",title:e("openInQuery"),size:11,onClick:()=>t.onQuery(x)}),(0,s.jsx)(oe,{icon:"table",title:e("data"),size:11,onClick:()=>t.onOpen(x)})]})})]},x.name))})]})})]})}function Jt(t){let{t:e,store:n}=t,a=fe(n.connections),l=fe(n.catalog),i=a.items.find(x=>x.id===t.connectionId),d=`${t.connectionId}|${t.database.name}|${t.schemas[0]??""}`,u=l.relations[d]??[],v=a.sessions[t.connectionId],h=i?i.engine!=="redis":!1;(0,xe.useEffect)(()=>{for(let x of t.schemas.length?t.schemas:[""])n.catalog.loadRelations(t.connectionId,t.database.name,x)},[t.connectionId,t.database.name,t.schemas,n]);let L=u.filter(x=>x.kind==="table").length,D=u.filter(x=>x.kind==="view").length,P=n.bindings().find(x=>x.connectionId===t.connectionId)??null;return(0,s.jsxs)("div",{className:"dg-content",children:[(0,s.jsxs)("div",{className:"dg-subbar",children:[(0,s.jsx)(S,{name:"database",size:12}),(0,s.jsx)("span",{className:"dg-mono",children:t.database.name}),(0,s.jsx)("span",{className:"dg-chip",children:i?.engine??""}),v?.version?(0,s.jsx)("span",{className:"dg-chip",children:v.version}):null,(0,s.jsx)("div",{className:"dg-spacer"}),h&&t.onNewQuery?(0,s.jsxs)(O,{size:"sm",variant:"tonal",onClick:t.onNewQuery,title:e("newQuery"),children:[(0,s.jsx)(S,{name:"play",size:10}),e("newQuery")]}):null]}),(0,s.jsxs)("div",{style:{overflow:"auto"},children:[(0,s.jsxs)("div",{className:"dg-cards",children:[(0,s.jsxs)("div",{className:"dg-card",onClick:()=>t.onOpenRelations("table"),style:{cursor:"pointer"},children:[(0,s.jsx)("div",{className:"dg-card-value",children:L}),(0,s.jsx)("div",{className:"dg-card-label",children:e("tables")})]}),(0,s.jsxs)("div",{className:"dg-card",onClick:()=>t.onOpenRelations("view"),style:{cursor:"pointer"},children:[(0,s.jsx)("div",{className:"dg-card-value",children:D}),(0,s.jsx)("div",{className:"dg-card-label",children:e("views")})]}),(0,s.jsxs)("div",{className:"dg-card",children:[(0,s.jsx)("div",{className:"dg-card-value",children:t.schemas.length||1}),(0,s.jsx)("div",{className:"dg-card-label",children:e("schema")})]}),(0,s.jsxs)("div",{className:"dg-card",children:[(0,s.jsx)("div",{className:"dg-card-value",children:t.database.file?Dt(t.database.file.length):"\u2014"}),(0,s.jsx)("div",{className:"dg-card-label",children:e("file")})]})]}),(0,s.jsxs)("div",{className:"dg-section",children:[(0,s.jsx)("div",{className:"dg-section-title",children:e("agentHint")}),P&&P.connectionId===t.connectionId?(0,s.jsx)(ue,{tone:"success",children:e("projectBound").replace("{name}",P.connectionName??P.connectionId).replace("{database}",P.database)}):(0,s.jsx)(ue,{children:e("projectUnbound")}),(0,s.jsx)(ue,{children:n.meta.allowWrites?e("writesEnabled"):e("readOnlyForAgent")})]}),(0,s.jsxs)("div",{className:"dg-section",children:[(0,s.jsx)("div",{className:"dg-section-title",children:e("schema")}),t.schemas.length>0?t.schemas.map(x=>(0,s.jsxs)("div",{className:"dg-row",children:[(0,s.jsx)(S,{name:"folder",size:11}),(0,s.jsx)("span",{className:"dg-mono",children:x})]},x)):(0,s.jsx)("div",{className:"dg-muted",children:"default"})]})]})]})}function Ut(t){let{t:e,store:n}=t,a=fe(n.catalog),l=`${t.connectionId}|${t.database}|${t.schema}`,i=a.routines[l]??[],[d,u]=(0,xe.useState)("");(0,xe.useEffect)(()=>{n.catalog.loadRoutines(t.connectionId,t.database,t.schema)},[t.connectionId,t.database,t.schema,n]);let v=i.find(h=>h.name===d)??null;return(0,s.jsxs)("div",{className:"dg-content",children:[(0,s.jsxs)("div",{className:"dg-subbar",children:[(0,s.jsx)(S,{name:"function",size:12}),(0,s.jsx)("span",{children:e("functions")}),(0,s.jsx)("span",{className:"dg-chip",children:i.length}),(0,s.jsx)("div",{className:"dg-spacer"}),(0,s.jsx)(oe,{icon:"refresh",title:e("refresh"),onClick:()=>{n.catalog.loadRoutines(t.connectionId,t.database,t.schema,!0)}})]}),(0,s.jsxs)("div",{className:"dg-struct",style:{flex:1},children:[(0,s.jsx)("div",{className:"dg-struct-col",style:{flex:"0 0 46%"},children:(0,s.jsx)("div",{className:"dg-struct-body",style:{padding:0},children:a.loading[l]?(0,s.jsx)("div",{className:"dg-sqlmsg",children:(0,s.jsx)(we,{label:e("loading")})}):i.length===0?(0,s.jsx)(ye,{title:e("noRoutines")}):(0,s.jsxs)("table",{className:"dg-list",children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{children:e("name")}),(0,s.jsx)("th",{children:e("type")}),(0,s.jsx)("th",{children:e("returnType")})]})}),(0,s.jsx)("tbody",{children:i.map(h=>(0,s.jsxs)("tr",{className:h.name===d?"dg-row-active":"",onClick:()=>u(h.name),children:[(0,s.jsx)("td",{className:"dg-mono",children:h.name}),(0,s.jsx)("td",{children:h.kind==="function"?e("functionKind"):e("procedureKind")}),(0,s.jsx)("td",{className:"dg-muted dg-truncate",children:h.returnType||"\u2014"})]},`${h.kind}-${h.name}`))})]})})}),(0,s.jsxs)("div",{className:"dg-struct-col",children:[(0,s.jsx)("div",{className:"dg-struct-head",children:e("definition")}),(0,s.jsx)("div",{className:"dg-struct-body",children:v?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)("div",{className:"dg-row",style:{marginBottom:6},children:[(0,s.jsx)("span",{className:"dg-mono",children:v.name}),(0,s.jsx)("span",{className:"dg-tag",children:v.language||v.kind})]}),(0,s.jsx)("pre",{className:"dg-pre",children:v.definition||"\u2014"})]}):(0,s.jsx)("div",{className:"dg-muted",children:e("selectConnection")})})]})]})]})}function _t(t){let{t:e,store:n}=t,a=fe(n.catalog),l=a.accounts[t.connectionId]??[];return(0,xe.useEffect)(()=>{n.catalog.loadAccounts(t.connectionId)},[t.connectionId,n]),(0,s.jsxs)("div",{className:"dg-content",children:[(0,s.jsxs)("div",{className:"dg-subbar",children:[(0,s.jsx)(S,{name:"user",size:12}),(0,s.jsx)("span",{children:e("users")}),(0,s.jsx)("span",{className:"dg-chip",children:l.length}),(0,s.jsx)("div",{className:"dg-spacer"}),(0,s.jsx)(oe,{icon:"refresh",title:e("refresh"),onClick:()=>{n.catalog.loadAccounts(t.connectionId,!0)}})]}),(0,s.jsx)("div",{className:"dg-grid-wrap",children:a.loading[t.connectionId]?(0,s.jsx)("div",{className:"dg-sqlmsg",children:(0,s.jsx)(we,{label:e("loading")})}):l.length===0?(0,s.jsx)(ye,{title:e("noAccounts")}):(0,s.jsxs)("table",{className:"dg-list",children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{children:e("accountName")}),(0,s.jsx)("th",{children:e("accountHost")}),(0,s.jsx)("th",{children:e("accountPlugin")}),(0,s.jsx)("th",{children:e("accountPrivileged")}),(0,s.jsx)("th",{children:e("accountLocked")})]})}),(0,s.jsx)("tbody",{children:l.map(i=>(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{className:"dg-mono",children:i.name}),(0,s.jsx)("td",{className:"dg-mono dg-muted",children:i.host}),(0,s.jsx)("td",{className:"dg-muted",children:i.plugin}),(0,s.jsx)("td",{children:i.privileged?"\u2713":""}),(0,s.jsx)("td",{children:i.locked?"\u2713":""})]},`${i.name}@${i.host}`))})]})})]})}function Xt(t){let{t:e,store:n}=t,a=fe(n.queries),l=fe(n.connections),[i,d]=(0,xe.useState)("");(0,xe.useEffect)(()=>{a.items.length===0&&n.queries.load()},[a.items.length,n]);let u=i.trim().toLowerCase(),v=(0,xe.useMemo)(()=>{let h=new Map;for(let L of a.items){if(u&&!L.name.toLowerCase().includes(u)&&!L.sql.toLowerCase().includes(u))continue;let D=l.items.find(Q=>Q.id===L.connectionId),P=D?.name||L.connectionId||e("connections"),x=L.database||"default",F=`${P} / ${x}`,z=h.get(F)??{key:F,connectionId:L.connectionId,connectionName:P,engine:D?.engine,database:x,items:[]};z.items.push(L),h.set(F,z)}return[...h.values()].sort((L,D)=>L.key.localeCompare(D.key))},[a.items,l.items,u,e]);return(0,s.jsxs)("div",{className:"dg-content",children:[(0,s.jsxs)("div",{className:"dg-subbar",children:[(0,s.jsx)(S,{name:"bookmark",size:12}),(0,s.jsx)("span",{children:e("queries")}),(0,s.jsx)("span",{className:"dg-chip",children:a.items.length}),(0,s.jsx)("div",{className:"dg-spacer"}),(0,s.jsx)(se,{value:i,placeholder:e("search"),style:{width:180},onChange:h=>d(h.target.value)}),(0,s.jsx)(oe,{icon:"refresh",title:e("refresh"),onClick:()=>{n.queries.load()}})]}),a.error?(0,s.jsx)(ue,{tone:"error",children:a.error}):null,(0,s.jsx)("div",{className:"dg-grid-wrap",children:a.loading&&a.items.length===0?(0,s.jsx)("div",{className:"dg-sqlmsg",children:(0,s.jsx)(we,{label:e("loading")})}):v.length===0?(0,s.jsx)(ye,{title:e("noQueries")}):(0,s.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:14,padding:"12px 16px"},children:v.map(h=>(0,s.jsxs)("div",{className:"dg-query-category",children:[(0,s.jsxs)("div",{className:"dg-query-category-head",children:[(0,s.jsx)("span",{className:"dg-query-category-icon",children:(0,s.jsx)(S,{name:"database",size:12})}),(0,s.jsx)("span",{className:"dg-query-category-title",children:h.connectionName}),h.engine?(0,s.jsx)("span",{className:"dg-badge",children:h.engine}):null,(0,s.jsx)("span",{className:"dg-query-category-sep",children:"/"}),(0,s.jsx)("span",{className:"dg-query-category-db",children:h.database}),(0,s.jsx)("span",{className:"dg-badge",style:{marginLeft:"auto"},children:h.items.length})]}),(0,s.jsxs)("table",{className:"dg-list",children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{children:e("queryName")}),(0,s.jsx)("th",{children:e("source")}),(0,s.jsx)("th",{children:e("updatedAt")}),(0,s.jsx)("th",{style:{width:96}})]})}),(0,s.jsx)("tbody",{children:h.items.map(L=>(0,s.jsxs)("tr",{onDoubleClick:()=>t.onOpen(L),children:[(0,s.jsx)("td",{children:(0,s.jsxs)("span",{className:"dg-list-name",children:[(0,s.jsx)(S,{name:"bookmark",size:11}),(0,s.jsx)("span",{style:{fontWeight:500},children:L.name})]})}),(0,s.jsx)("td",{children:(0,s.jsx)("span",{className:"dg-tag",children:L.scope})}),(0,s.jsx)("td",{className:"dg-muted",children:Pt(L.updatedAt)}),(0,s.jsx)("td",{children:(0,s.jsxs)("span",{className:"dg-row",style:{gap:2},children:[(0,s.jsx)(oe,{icon:"play",title:e("openInEditor"),size:11,onClick:()=>t.onOpen(L)}),(0,s.jsx)(oe,{icon:"trash",title:e("delete"),size:11,onClick:()=>{n.queries.remove(L.id).catch(D=>t.notify(String(D),"error"))}})]})})]},L.id))})]})]},h.key))})})]})}var le=require("react");var w=require("react/jsx-runtime");function Gt(t){let{t:e,tab:n}=t,[a,l]=(0,le.useState)([]),[i,d]=(0,le.useState)(Number(n.database.replace(/[^0-9]/g,""))||0),[u,v]=(0,le.useState)("*"),[h,L]=(0,le.useState)(""),[D,P]=(0,le.useState)([]),[x,F]=(0,le.useState)("0"),[z,Q]=(0,le.useState)(""),[A,N]=(0,le.useState)(null),[j,Y]=(0,le.useState)(""),[V,ne]=(0,le.useState)(null),[k,U]=(0,le.useState)(""),[re,q]=(0,le.useState)(!1),[R,Z]=(0,le.useState)(()=>new Set),[E,J]=(0,le.useState)(null),[X,ce]=(0,le.useState)("");(0,le.useEffect)(()=>{H.redisDatabases(n.connectionId).then(r=>l(r.databases)).catch(()=>{})},[n.connectionId]);let me=async r=>{try{let m=await H.redisScan({connectionId:n.connectionId,cursor:r?"0":x,pattern:u,type:h,database:i});P(B=>{let G=r?[]:B.slice(),de=new Set(G.map(he=>he.key));for(let he of m.keys)de.has(he.key)||G.push(he);return G.sort((he,Pe)=>he.key.localeCompare(Pe.key))}),F(m.cursor),U("")}catch(m){U(m instanceof Error?m.message:String(m))}};(0,le.useEffect)(()=>{P([]),Q(""),N(null),me(!0)},[n.connectionId,i]);let ie=async r=>{Q(r);try{N(await H.redisKey(n.connectionId,r,i)),U("")}catch(m){N(null),U(m instanceof Error?m.message:String(m))}},Ne=async r=>{q(!0);try{let m=await H.redisCommand(n.connectionId,r);ne(m.reply),await me(!0),z&&await ie(z),U("")}catch(m){U(m instanceof Error?m.message:String(m))}finally{q(!1)}},p=(0,le.useMemo)(()=>{let r=new Map;for(let m of D){let B=m.key.indexOf(":"),G=B>0?m.key.slice(0,B):"",de=r.get(G)??[];de.push(m),r.set(G,de)}return[...r.entries()].sort((m,B)=>m[0]===""?1:B[0]===""?-1:m[0].localeCompare(B[0]))},[D]),o=()=>A?A.value===null||A.value===void 0?(0,w.jsx)(ye,{title:e("null")}):A.type==="string"?(0,w.jsx)("pre",{className:"dg-pre",style:{padding:9},children:String(A.value)}):A.type==="hash"?(0,w.jsx)("div",{className:"dg-grid-wrap",children:(0,w.jsx)("table",{className:"dg-grid",style:{width:"100%"},children:(0,w.jsx)("tbody",{children:Object.entries(A.value).map(([r,m])=>(0,w.jsxs)("tr",{children:[(0,w.jsx)("td",{className:"dg-mono",style:{width:"32%"},children:r}),(0,w.jsx)("td",{children:String(m)})]},r))})})}):Array.isArray(A.value)?(0,w.jsx)("div",{className:"dg-grid-wrap",children:(0,w.jsx)("table",{className:"dg-grid",style:{width:"100%"},children:(0,w.jsx)("tbody",{children:A.value.map((r,m)=>(0,w.jsxs)("tr",{children:[(0,w.jsx)("td",{className:"dg-rownum",children:m}),(0,w.jsx)("td",{className:"dg-mono",children:typeof r=="object"?JSON.stringify(r):String(r)})]},m))})})}):(0,w.jsx)("pre",{className:"dg-pre",style:{padding:9},children:JSON.stringify(A.value,null,2)}):(0,w.jsx)(ye,{title:e("keyValue")});return(0,w.jsxs)("div",{className:"dg-redis",children:[(0,w.jsxs)("div",{className:"dg-redis-list",children:[(0,w.jsxs)("div",{className:"dg-panehead",children:[(0,w.jsx)(S,{name:"database",size:11}),e("redisKeys"),(0,w.jsx)("div",{className:"dg-spacer"}),(0,w.jsx)(ke,{value:String(i),onChange:r=>d(Number(r.target.value)),children:(a.length?a:[{name:"db0",schemas:[]}]).map(r=>(0,w.jsx)("option",{value:r.name.replace("db",""),children:r.name},r.name))}),(0,w.jsx)(oe,{icon:"plus",title:e("newKey"),size:11,onClick:()=>{J({kind:"new"}),ce("")}}),(0,w.jsx)(oe,{icon:"refresh",title:e("refresh"),size:11,onClick:()=>{me(!0)}})]}),(0,w.jsxs)("div",{className:"dg-row",style:{padding:"4px 6px",gap:4},children:[(0,w.jsxs)("div",{className:"dg-search",children:[(0,w.jsx)(S,{name:"search",size:10}),(0,w.jsx)("input",{value:u,placeholder:e("redisPattern"),onChange:r=>v(r.target.value),onKeyDown:r=>r.key==="Enter"&&void me(!0)})]}),(0,w.jsxs)(ke,{value:h,onChange:r=>{L(r.target.value),me(!0)},children:[(0,w.jsx)("option",{value:"",children:"any"}),["string","hash","list","set","zset","stream"].map(r=>(0,w.jsx)("option",{value:r,children:r},r))]})]}),(0,w.jsx)("div",{className:"dg-redis-keys",children:D.length===0?(0,w.jsx)("div",{className:"dg-muted",style:{padding:7},children:e("emptyObjects")}):p.map(([r,m])=>{let B=r===""||!R.has(r);return(0,w.jsxs)("div",{children:[r?(0,w.jsxs)("div",{className:"dg-rns",onClick:()=>Z(G=>{let de=new Set(G);return de.has(r)?de.delete(r):de.add(r),de}),children:[(0,w.jsx)("span",{className:`dg-twist${B?" dg-twist-open":""}`,children:(0,w.jsx)(S,{name:"chevron",size:8})}),(0,w.jsx)(S,{name:"folder",size:10}),(0,w.jsxs)("span",{className:"dg-truncate",style:{flex:1},children:[r,":"]}),(0,w.jsx)("span",{className:"dg-badge",children:m.length})]}):null,B?m.map(G=>(0,w.jsxs)("div",{className:`dg-rkey${G.key===z?" dg-rkey-active":""}`,onClick:()=>{ie(G.key)},title:G.key,children:[(0,w.jsx)("span",{className:"dg-truncate",style:{flex:1},children:r?G.key.slice(r.length+1):G.key}),(0,w.jsx)("span",{className:"dg-badge",children:G.type})]},G.key)):null]},r||"_")})}),x!=="0"?(0,w.jsx)("div",{className:"dg-pager",children:(0,w.jsx)(O,{size:"sm",onClick:()=>{me(!1)},children:e("scanMore")})}):null]}),(0,w.jsxs)("div",{className:"dg-redis-detail",children:[k?(0,w.jsx)(ue,{tone:"error",onClose:()=>U(""),children:k}):null,A?(0,w.jsxs)("div",{className:"dg-subbar",children:[(0,w.jsx)("span",{className:"dg-mono dg-truncate",title:A.key,children:A.key}),(0,w.jsx)("span",{className:"dg-tag",children:A.type}),(0,w.jsxs)("span",{className:"dg-chip",children:[e("ttl"),": ",A.ttl>0?`${A.ttl}s`:e("noTtl")]}),(0,w.jsx)("div",{className:"dg-spacer"}),(0,w.jsx)(O,{size:"sm",onClick:()=>{J({kind:"rename"}),ce(A.key)},children:e("rename")}),(0,w.jsx)(O,{size:"sm",onClick:()=>{J({kind:"ttl"}),ce(A.ttl>0?String(A.ttl):"3600")},children:e("setTtl")}),(0,w.jsx)(O,{size:"sm",onClick:()=>{J({kind:"value"}),ce(String(A.value??""))},children:e("editValue")}),(0,w.jsx)(O,{size:"sm",variant:"danger",onClick:()=>{(async()=>{await H.redisDelete(n.connectionId,A.key,A.database??i),Q(""),N(null),await me(!0),t.notify(e("deleted"),"success")})()},children:e("deleteKey")})]}):null,(0,w.jsx)("div",{className:"dg-grid-wrap",children:o()}),(0,w.jsxs)("div",{className:"dg-redis-console",children:[(0,w.jsxs)("div",{className:"dg-row",children:[(0,w.jsx)(S,{name:"play",size:10}),(0,w.jsx)(se,{value:j,placeholder:e("commandHint"),style:{flex:1},onChange:r=>Y(r.target.value),onKeyDown:r=>r.key==="Enter"&&j.trim()&&void Ne(j)}),(0,w.jsx)(O,{size:"sm",variant:"primary",disabled:re,onClick:()=>j.trim()&&void Ne(j),children:e("run")})]}),V!==null?(0,w.jsx)("pre",{className:"dg-pre",style:{maxHeight:110,overflow:"auto"},children:JSON.stringify(V,null,2)}):null]})]}),E?(0,w.jsx)(Ee,{title:E.kind==="new"?e("newKey"):E.kind==="rename"?e("rename"):E.kind==="ttl"?e("setTtl"):e("editValue"),width:420,onClose:()=>J(null),footer:(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(O,{onClick:()=>J(null),children:e("cancel")}),(0,w.jsx)(O,{variant:"primary",onClick:()=>{(async()=>{let r=B=>B.replace(/\\/g,"\\\\").replace(/"/g,'\\"'),m="";E.kind==="new"&&(m=`SET "${r(X)}" ""`),E.kind==="rename"&&A&&(m=`RENAME "${r(A.key)}" "${r(X)}"`),E.kind==="ttl"&&A&&(m=`EXPIRE "${r(A.key)}" ${Number.parseInt(X,10)||0}`),E.kind==="value"&&A&&(m=`SET "${r(A.key)}" "${r(X)}"`),m&&await Ne(m),J(null),t.notify(e("saved"),"success")})()},children:e("save")})]}),children:(0,w.jsx)(ge,{label:E.kind==="ttl"?e("ttl"):E.kind==="value"?e("keyValue"):e("name"),children:(0,w.jsx)(se,{value:X,autoFocus:!0,onChange:r=>ce(r.target.value)})})}):null]})}var pe=require("react");var M=require("react/jsx-runtime");function Yt(t){let{t:e,tab:n}=t,[a,l]=(0,pe.useState)(n.initialSql??""),[i,d]=(0,pe.useState)(null),[u,v]=(0,pe.useState)(0),[h,L]=(0,pe.useState)(!1),[D,P]=(0,pe.useState)(""),[x,F]=(0,pe.useState)(""),[z,Q]=(0,pe.useState)(null),[A,N]=(0,pe.useState)(0),[j,Y]=(0,pe.useState)(!1),[V,ne]=(0,pe.useState)(""),k=(0,pe.useRef)(null),U=(0,pe.useRef)(null),re=(0,pe.useMemo)(()=>a.split(`
`).length,[a]),q=(0,pe.useMemo)(()=>{let p=[];for(let o of t.tables)p.push({label:o,kind:"table"});for(let o of lt)p.push({label:o,kind:"fn"});for(let o of dt)p.push({label:o,kind:"kw"});return p},[t.tables]);(0,pe.useEffect)(()=>{n.initialSql&&l(n.initialSql)},[n.id,n.initialSql]);let R=p=>{let o=k.current;if(!o)return;let r=o.selectionStart,m=/([A-Za-z_][A-Za-z0-9_]*)$/.exec(a.slice(0,r))?.[1]??"";if(!m&&!p)return Q(null);let B=m.toLowerCase(),G=new Set,de=q.filter(Pe=>{let qe=Pe.label.toLowerCase();return B&&!qe.startsWith(B)||G.has(qe)?!1:(G.add(qe),!0)}).slice(0,14);if(de.length===0)return Q(null);let he=Rt(o,r-m.length);Q({items:de,index:0,left:he.left,top:he.top+18,start:r-m.length,end:r})},Z=()=>{if(!z)return;let p=z.items[z.index];if(!p)return;let o=z.start+p.label.length;l(`${a.slice(0,z.start)}${p.label}${a.slice(z.end)}`),Q(null),requestAnimationFrame(()=>{let r=k.current;r&&(r.focus(),r.selectionStart=r.selectionEnd=o)})},E=async p=>{let o=p.trim();if(!o)return t.notify(e("noStatements"),"info");L(!0),P("");try{let r=await H.sql({connectionId:n.connectionId,database:n.database,sql:o});d(r),v(0);let m=r.results.find(G=>G.error),B=r.results[0];F(m?ve(e("queryFailed"),{ms:r.durationMs}):ve(e("queryOk"),{n:B?.rowCount??0,ms:r.durationMs})),r.results.some(G=>G.truncated)&&P(e("resultTruncated")),m?.error&&P(m.error)}catch(r){P(r instanceof Error?r.message:String(r)),d(null),F("")}finally{L(!1)}},J=async()=>{try{let p=await H.sqlCancel(n.connectionId);t.notify(p.cancelled?e("queryCancelled"):p.reason||e("cancelUnsupported"),p.cancelled?"info":"error")}catch(p){t.notify(p instanceof Error?p.message:String(p),"error")}},X=()=>{let p=k.current;p&&p.selectionStart!==p.selectionEnd?E(a.slice(p.selectionStart,p.selectionEnd)):E(a)},ce=()=>{let p=a.split(";").map(o=>o.trim()).filter(Boolean)[0];if(!p)return t.notify(e("noStatements"),"info");E(/^explain\b/i.test(p)?p:`EXPLAIN ${p}`)},me=p=>{if(z){if(p.key==="ArrowDown")return p.preventDefault(),Q({...z,index:(z.index+1)%z.items.length});if(p.key==="ArrowUp")return p.preventDefault(),Q({...z,index:(z.index-1+z.items.length)%z.items.length});if(p.key==="Enter"||p.key==="Tab")return p.preventDefault(),Z();if(p.key==="Escape")return p.preventDefault(),Q(null)}if((p.ctrlKey||p.metaKey)&&p.key==="Enter")return p.preventDefault(),X();if(p.ctrlKey&&p.key===" ")return p.preventDefault(),R(!0);if(p.key==="Tab"){p.preventDefault();let o=p.currentTarget,r=o.selectionStart,m=o.selectionEnd;l(`${a.slice(0,r)}  ${a.slice(m)}`),requestAnimationFrame(()=>{o.selectionStart=o.selectionEnd=r+2})}},ie=i?.results[u]??null,Ne=()=>i?ie?ie.error?(0,M.jsxs)("div",{style:{padding:9},children:[(0,M.jsx)("div",{className:"dg-err",children:ie.error}),(0,M.jsx)("pre",{className:"dg-pre",style:{marginTop:7,opacity:.7},children:ie.statement})]}):ie.columns.length===0?(0,M.jsxs)("div",{className:"dg-sqlmsg",children:[ve(e("affected"),{n:ie.affected??0})," \xB7 ",ie.durationMs," ms"]}):(0,M.jsx)("div",{className:"dg-grid-wrap",children:(0,M.jsxs)("table",{className:"dg-grid",style:{width:"100%"},children:[(0,M.jsx)("thead",{children:(0,M.jsxs)("tr",{children:[(0,M.jsx)("th",{className:"dg-rownum",children:"#"}),ie.columns.map(p=>(0,M.jsx)("th",{children:p.name},p.name))]})}),(0,M.jsx)("tbody",{children:ie.rows.map((p,o)=>(0,M.jsxs)("tr",{children:[(0,M.jsx)("td",{className:"dg-rownum",children:o+1}),ie.columns.map(r=>{let m=We(p[r.name],e("null"));return(0,M.jsx)("td",{className:m.isNull?"dg-null":"",title:m.text,children:m.text},r.name)})]},o))})]})}):(0,M.jsx)(ye,{title:e("emptyResult")}):(0,M.jsx)(ye,{title:e("runHint"),hint:e("completionHint")});return(0,M.jsxs)("div",{className:"dg-sql",children:[(0,M.jsxs)("div",{className:"dg-sql-top",children:[(0,M.jsxs)("div",{className:"dg-editor",children:[(0,M.jsx)("div",{className:"dg-gutter","aria-hidden":!0,children:(0,M.jsx)("div",{style:{transform:`translateY(${-A}px)`},children:Array.from({length:re},(p,o)=>o+1).join(`
`)})}),(0,M.jsxs)("div",{className:"dg-code",children:[(0,M.jsxs)("pre",{className:"dg-hl",ref:U,"aria-hidden":!0,children:[ct(a).map((p,o)=>p.type==="ws"?p.value:(0,M.jsx)("span",{className:`dg-tok dg-tok-${p.type==="plain"?"ident":p.type}`,children:p.value},o)),(0,M.jsx)("span",{children:"\u200B"})]}),(0,M.jsx)("textarea",{ref:k,className:"dg-sql-text",value:a,spellCheck:!1,placeholder:"SELECT * FROM ...",onChange:p=>{l(p.target.value),requestAnimationFrame(()=>R(!1))},onScroll:p=>{if(N(p.currentTarget.scrollTop),U.current){let o=p.currentTarget;U.current.scrollTop=o.scrollTop,U.current.scrollLeft=o.scrollLeft}},onKeyDown:me,onBlur:()=>setTimeout(()=>Q(null),120)}),z?(0,M.jsx)("div",{className:"dg-complete",style:{left:z.left,top:z.top},children:z.items.map((p,o)=>(0,M.jsxs)("div",{className:`dg-complete-item${o===z.index?" dg-complete-item-on":""}`,onMouseDown:r=>{r.preventDefault(),Q({...z,index:o}),requestAnimationFrame(Z)},children:[(0,M.jsx)("span",{children:p.label}),(0,M.jsx)("span",{className:"dg-complete-kind",children:p.kind})]},`${p.kind}-${p.label}`))}):null]})]}),(0,M.jsxs)("div",{className:"dg-sqlbar",children:[(0,M.jsxs)(O,{size:"sm",variant:"primary",disabled:h,onClick:X,children:[h?(0,M.jsx)(we,{}):(0,M.jsx)(S,{name:"play",size:10}),e("run")]}),h?(0,M.jsx)(O,{size:"sm",variant:"danger",onClick:()=>{J()},children:e("cancelQuery")}):null,(0,M.jsx)(O,{size:"sm",disabled:h,onClick:ce,children:e("explain")}),(0,M.jsxs)(O,{size:"sm",onClick:()=>l(Et(a)),children:[(0,M.jsx)(S,{name:"wand",size:10}),e("beautify")]}),(0,M.jsxs)(O,{size:"sm",onClick:()=>{ne(V||`Query ${new Date().toISOString().slice(0,16).replace("T"," ")}`),Y(!0)},children:[(0,M.jsx)(S,{name:"bookmark",size:10}),e("saveQuery")]}),(0,M.jsx)(O,{size:"sm",variant:"ghost",onClick:()=>{l(""),d(null),P(""),F("")},children:e("clear")}),(0,M.jsx)("span",{className:"dg-muted dg-hint",children:e("runHint")}),(0,M.jsx)("div",{className:"dg-spacer"}),x?(0,M.jsx)("span",{className:"dg-chip",children:x}):null]})]}),i&&i.results.length>1?(0,M.jsx)("div",{className:"dg-rtabs",children:i.results.map((p,o)=>(0,M.jsxs)("button",{type:"button",className:`dg-rtab${o===u?" dg-rtab-active":""}`,onClick:()=>v(o),children:[p.error?(0,M.jsx)(S,{name:"alert",size:10}):null,ve(e("result"),{n:o+1})," \xB7 ",p.rowCount]},o))}):null,D&&!ie?.error?(0,M.jsx)(ue,{tone:"error",onClose:()=>P(""),children:D}):null,(0,M.jsx)("div",{className:"dg-results",children:Ne()}),j?(0,M.jsxs)(Ee,{title:e("saveQuery"),width:420,onClose:()=>Y(!1),footer:(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)(O,{onClick:()=>Y(!1),children:e("cancel")}),(0,M.jsx)(O,{variant:"primary",onClick:()=>{(async()=>{try{await H.saveQuery({name:V.trim()||"Query",sql:a,connectionId:n.connectionId,database:n.database,scope:"user"}),Y(!1),t.notify(e("querySaved"),"success"),t.onSaved()}catch(p){t.notify(p instanceof Error?p.message:String(p),"error")}})()},children:e("save")})]}),children:[(0,M.jsx)(ge,{label:e("queryName"),children:(0,M.jsx)(se,{value:V,autoFocus:!0,onChange:p=>ne(p.target.value)})}),(0,M.jsx)("pre",{className:"dg-pre",style:{maxHeight:160,overflow:"auto"},children:a})]}):null]})}var W=require("react");var c=require("react/jsx-runtime"),zn=[50,100,200,500];function $n(t){let e=String(t??"").toLowerCase();if(/\b(json|jsonb|xml|text|clob|ntext|longtext|mediumtext|bytea)\b/.test(e))return!0;let n=/(?:var)?char(?:acter varying)?\s*\(\s*(\d+)\s*\)/.exec(e);return n?Number(n[1])>120:!1}function Zt(t){let{t:e,tab:n,engine:a}=t,[l,i]=(0,W.useState)("data"),d={connectionId:n.connectionId,database:n.database,schema:n.schema,table:n.table},u=`${d.connectionId}|${d.database}|${d.schema}|${d.table}`,[v,h]=(0,W.useState)(null),[L,D]=(0,W.useState)(""),[P,x]=(0,W.useState)(0);return(0,W.useEffect)(()=>{let F=!1;return H.describe(d.connectionId,d.database,d.schema,d.table).then(z=>{F||(h(z),D(""))}).catch(z=>{F||D(z instanceof Error?z.message:String(z))}),()=>{F=!0}},[u,P]),(0,c.jsxs)("div",{className:"dg-content",children:[(0,c.jsxs)("div",{className:"dg-subbar",children:[(0,c.jsx)(S,{name:n.tableKind==="view"?"view":"table",size:12}),(0,c.jsx)("span",{className:"dg-mono",children:n.table}),(0,c.jsx)("span",{className:"dg-chip",children:n.database||"main"}),n.schema?(0,c.jsx)("span",{className:"dg-chip",children:n.schema}):null,(0,c.jsx)("div",{className:"dg-spacer"}),(0,c.jsx)(Kt,{value:l,onChange:i,options:[{value:"data",label:e("data")},{value:"structure",label:e("structure")}]})]}),l==="data"?(0,c.jsx)(Dn,{t:e,scope:d,engine:a,notify:t.notify,meta:v,onRefreshMeta:()=>x(F=>F+1),onNewQuery:t.onNewQuery}):(0,c.jsx)(Pn,{t:e,meta:v,error:L,onRefresh:()=>x(F=>F+1)})]})}function Dn({t,scope:e,engine:n,notify:a,meta:l,onRefreshMeta:i,onNewQuery:d}){let[u,v]=(0,W.useState)(1),[h,L]=(0,W.useState)(100),[D,P]=(0,W.useState)({column:"",dir:""}),[x,F]=(0,W.useState)(""),[z,Q]=(0,W.useState)(!1),[A,N]=(0,W.useState)([]),[j,Y]=(0,W.useState)("AND"),[V,ne]=(0,W.useState)(null),[k,U]=(0,W.useState)(!1),[re,q]=(0,W.useState)(""),[R,Z]=(0,W.useState)(null),[E,J]=(0,W.useState)(null),[X,ce]=(0,W.useState)(0),[me,ie]=(0,W.useState)(null),[Ne,p]=(0,W.useState)(!1),[o,r]=(0,W.useState)([]),[m,B]=(0,W.useState)(null),[G,de]=(0,W.useState)(!1),[he,Pe]=(0,W.useState)(null),qe=(0,W.useRef)(null),Ye=(0,W.useRef)(!1),yt=(0,W.useRef)(null),Ze=`${e.connectionId}|${e.database}|${e.schema}|${e.table}`,[Fe,et]=(0,W.useState)("");(0,W.useEffect)(()=>{if(Fe===x)return;let g=setTimeout(()=>{F(Fe),v(1)},320);return()=>clearTimeout(g)},[Fe,x]);let tt=(0,W.useRef)(""),nt=(0,W.useRef)(!1),at=`${Ze}|${x}|${D.column}|${D.dir}`;(0,W.useEffect)(()=>{let g=new AbortController,f=!1;U(!0),q("");let y=nt.current?"exact":tt.current===at?"none":"auto";return H.rows({...e,page:u,pageSize:h,orderBy:D.column,orderDir:D.dir,where:x,total:y},g.signal).then(b=>{f||(tt.current=at,nt.current=!1,ne(T=>({...b,total:typeof b.total=="number"?b.total:T?.total??b.rows.length,totalKind:b.totalKind==="none"&&T?T.totalKind:b.totalKind})))}).catch(b=>{f||b instanceof DOMException&&b.name==="AbortError"||(q(b instanceof Error?b.message:String(b)),ne(null))}).finally(()=>{f||U(!1)}),()=>{f=!0,g.abort()}},[Ze,u,h,D.column,D.dir,x,X,at]);let Ie=l?.columns??[],je=(0,W.useMemo)(()=>Ie.filter(g=>g.primaryKey).map(g=>g.name),[Ie]),Ce=V?.rows??[],wt=V?.total??0,st=Math.max(1,Math.ceil(wt/h)),Te=je.length===0,Le=(V?.columns??[]).filter(g=>!o.includes(g.name)),sn=Ie.length>0?Ie.map(g=>({name:g.name,type:g.type,primaryKey:!!g.primaryKey,nullable:g.nullable})):(V?.columns??[]).map(g=>({name:g.name,type:g.type??"",primaryKey:!1,nullable:!0})),Be=(0,W.useCallback)(()=>{tt.current="",nt.current=!0,ce(g=>g+1),i()},[i]);(0,W.useEffect)(()=>{Z(null),J(null)},[Ze,u,h,x,X]);let Me=(0,W.useMemo)(()=>{if(!R||!V)return null;let g=[],f=0;for(let b=R.top;b<=R.bottom;b+=1){let T=Ce[b];if(T)for(let te=R.left;te<=R.right;te+=1){let ae=Le[te];if(!ae)continue;f+=1;let ee=Number(T[ae.name]);!Number.isNaN(ee)&&T[ae.name]!==null&&g.push(ee)}}if(g.length===0)return{cells:f,count:0,sum:0,avg:0};let y=g.reduce((b,T)=>b+T,0);return{cells:f,count:g.length,sum:y,avg:y/g.length}},[R,V,Ce]),rn=g=>{P(f=>f.column!==g?{column:g,dir:"asc"}:f.dir==="asc"?{column:g,dir:"desc"}:{column:"",dir:""}),v(1)},on=async()=>{if(!R||!V)return;let g=[];for(let f=R.top;f<=R.bottom;f+=1){let y=Ce[f];y&&g.push(Le.slice(R.left,R.right+1).map(b=>Je(y[b.name])).join("	"))}try{await navigator.clipboard.writeText(g.join(`
`)),a(t("copied"),"success")}catch{a(t("error"),"error")}},xt=async(g,f,y)=>{let b=E;if(J(null),!b)return;let T=y==null?"":String(y);if(b.value===T)return;if(Te)return a(t("noPrimaryKey"),"error");let te=Ce[g];if(!te)return;let ae={};for(let be of je)ae[be]=te[be];let ee=Le[f];if(ee)try{await H.updateRow({...e,key:ae,changes:{[ee.name]:b.value===""&&y===null?null:b.value}}),a(t("cellSaved"),"success"),Be()}catch(be){a(be instanceof Error?be.message:String(be),"error")}},dn=async g=>{let f=Ce[g];if(!f||Te||!window.confirm(t("confirmDelete")))return;let y={};for(let b of je)y[b]=f[b];try{await H.deleteRow({...e,key:y}),a(t("deleted"),"success"),Be()}catch(b){a(b instanceof Error?b.message:String(b),"error")}},He=async g=>{try{let f=await H.exportRows({...e,where:x,orderBy:D.column,orderDir:D.dir}),y=Tt(e.table);if(g==="csv"){let b=f.columns.map(te=>te.name),T=[b.map(Je).join(",")].concat(f.rows.map(te=>b.map(ae=>Je(te[ae])).join(","))).join(`\r
`);Ve(`${y}.csv`,"text/csv",T)}else g==="json"?Ve(`${y}.json`,"application/json",JSON.stringify(f.rows,null,2)):g==="insert"?Ve(`${y}.sql`,"application/sql",Mt(n,e,f.columns,f.rows)):Ve(`${y}.md`,"text/markdown",zt(f.columns,f.rows));f.truncated&&a(ve(t("exportTruncated"),{n:f.rows.length}),"info")}catch(f){a(f instanceof Error?f.message:String(f),"error")}},kt=200,ln=async g=>{let f=await g.text(),y=$t(f);if(y.header.length===0||y.rows.length===0){a(t("importEmpty"),"error");return}let b=new Set((Ie.length?Ie:V?.columns??[]).map(ee=>ee.name));if(b.size===0){a(t("importNoColumns"),"error");return}let T=y.header.filter(ee=>!b.has(ee));if(T.length>0){a(ve(t("importUnknownColumns"),{cols:T.join(", ")}),"error");return}let te=y.rows.map(ee=>{let be={};return y.header.forEach((Qe,vn)=>{let Nt=ee[vn]??"";be[Qe]=Nt===""?null:Nt}),be});p(!0);let ae=0;try{for(let ee=0;ee<te.length;ee+=kt){let be=te.slice(ee,ee+kt),Qe=await H.insertRows({...e,rows:be});ae+=Qe.inserted}a(ve(t("importDone"),{n:ae}),"success"),Be()}catch(ee){let be=ee instanceof Error?ee.message:String(ee);a(ve(t("importFailed"),{n:ae,error:be}),"error")}finally{p(!1)}},cn=async()=>{try{let g=await H.insertRow({...e,values:{}});a(g.affected>0?t("rowInserted"):t("insertRowFailed"),g.affected>0?"success":"error"),Be()}catch(g){a(g instanceof Error?g.message:String(g),"error")}},gn=g=>{let f=Ce[g];if(!f||Te)return;let y={};for(let b of V?.columns??[]){let T=f[b.name];y[b.name]=T==null?"":String(T)}B({rowIndex:g,draft:y})},un=async()=>{let g=m,f=g?Ce[g.rowIndex]:void 0;if(!g||!f)return;let y={};for(let T of V?.columns??[]){let te=f[T.name],ae=te==null?"":String(te),ee=g.draft[T.name]??"";if(ee===ae)continue;let be=Ie.find(Qe=>Qe.name===T.name);y[T.name]=ee===""&&(be?.nullable??!0)?null:ee}if(Object.keys(y).length===0){B(null);return}let b={};for(let T of je)b[T]=f[T];de(!0);try{await H.updateRow({...e,key:b,changes:y}),a(t("rowSaved"),"success"),B(null),Be()}catch(T){a(T instanceof Error?T.message:String(T),"error")}finally{de(!1)}},rt=(g,f,y)=>{Z(b=>y&&b?{top:Math.min(b.top,g),left:Math.min(b.left,f),bottom:Math.max(b.bottom,g),right:Math.max(b.right,f)}:{top:g,left:f,bottom:g,right:f})},mn=g=>{if((g.ctrlKey||g.metaKey)&&g.key.toLowerCase()==="c"){g.preventDefault(),on();return}if(!R)return;let y={ArrowUp:[-1,0],ArrowDown:[1,0],ArrowLeft:[0,-1],ArrowRight:[0,1]}[g.key];if(!y)return;g.preventDefault();let b=Math.max(0,Math.min(Ce.length-1,R.top+y[0])),T=Math.max(0,Math.min(Le.length-1,R.left+y[1]));rt(b,T,g.shiftKey)},pn=Le.map((g,f)=>(0,c.jsxs)("th",{className:D.column===g.name?"dg-th-sorted":"",onClick:()=>rn(g.name),title:g.name,children:[g.name,D.column===g.name?(0,c.jsx)("span",{className:"dg-sortmark",children:D.dir==="desc"?"\u25BC":"\u25B2"}):null,je.includes(g.name)?(0,c.jsx)("span",{className:"dg-colkey",title:t("primaryKey"),children:(0,c.jsx)(S,{name:"key",size:10})}):null,(0,c.jsx)("span",{className:"dg-colresize",onMouseDown:y=>{y.stopPropagation();let b=y.clientX,T=y.target.parentElement,te=T?.offsetWidth??160,ae=be=>{T&&(T.style.width=`${Math.max(60,te+be.clientX-b)}px`)},ee=()=>{window.removeEventListener("mousemove",ae),window.removeEventListener("mouseup",ee)};window.addEventListener("mousemove",ae),window.addEventListener("mouseup",ee)},onClick:y=>y.stopPropagation()})]},g.name));return(0,c.jsxs)("div",{className:"dg-content",children:[Te?(0,c.jsx)(ue,{tone:"info",children:t("noPrimaryKey")}):null,re?(0,c.jsx)(ue,{tone:"error",onClose:()=>q(""),children:re}):null,(0,c.jsxs)("div",{className:"dg-subbar",children:[(0,c.jsxs)(O,{size:"sm",active:!!x,onClick:()=>{let g=gt(n,{joiner:j,conditions:A});et(g),F(g),v(1)},children:[(0,c.jsx)(S,{name:"filter",size:11}),t("filter")]}),(0,c.jsx)(O,{size:"sm",variant:"ghost",onClick:()=>Q(g=>!g),children:t("filterBuilder")}),(0,c.jsx)(se,{value:Fe,placeholder:t("rawWhere"),style:{flex:1,minWidth:120,maxWidth:380},onChange:g=>et(g.target.value),onKeyDown:g=>{g.key==="Enter"&&(F(Fe),v(1))}}),x?(0,c.jsx)(O,{size:"sm",variant:"ghost",onClick:()=>{et(""),F(""),N([]),v(1)},children:t("clear")}):null,d&&n!=="redis"?(0,c.jsxs)(O,{size:"sm",variant:"tonal",onClick:d,title:t("newQuery"),children:[(0,c.jsx)(S,{name:"play",size:10}),t("newQuery")]}):null,(0,c.jsx)("div",{className:"dg-spacer"}),(0,c.jsxs)("span",{className:"dg-chip",title:V?.totalKind==="estimate"?t("estimatedTotal"):void 0,children:[V?.totalKind==="estimate"?"\u2248 ":"",(0,c.jsx)("b",{children:wt})," ",t("rows")]}),(0,c.jsx)(oe,{icon:"refresh",title:t("refresh"),onClick:Be}),(0,c.jsx)(O,{size:"sm",variant:"ghost",onClick:()=>{cn()},children:t("insertRow")}),(0,c.jsx)("input",{ref:qe,type:"file",accept:".csv,text/csv",style:{display:"none"},onChange:g=>{let f=g.target.files?.[0];f&&ln(f),g.target.value=""}}),(0,c.jsxs)(O,{size:"sm",variant:"ghost",disabled:Ne,onClick:()=>qe.current?.click(),children:[Ne?(0,c.jsx)(we,{}):null,t("importCsv")]}),(0,c.jsx)(O,{size:"sm",variant:"ghost",onClick:g=>{let f=g.currentTarget.getBoundingClientRect();Pe({x:f.left,y:f.bottom+2})},children:t("columnChooser")}),(0,c.jsx)(O,{size:"sm",variant:"ghost",onClick:g=>{let f=g.currentTarget.getBoundingClientRect();ie({x:f.left,y:f.bottom+2})},children:t("exportAs")})]}),z?(0,c.jsxs)("div",{className:"dg-subbar",style:{gap:6,flexWrap:"wrap"},children:[(0,c.jsxs)(ke,{value:j,onChange:g=>Y(g.target.value),children:[(0,c.jsx)("option",{value:"AND",children:t("matchAll")}),(0,c.jsx)("option",{value:"OR",children:t("matchAny")})]}),A.map((g,f)=>(0,c.jsxs)("span",{className:"dg-row",style:{gap:3},children:[(0,c.jsx)(ke,{value:g.column,onChange:y=>N(b=>b.map((T,te)=>te===f?{...T,column:y.target.value}:T)),children:Ie.map(y=>(0,c.jsx)("option",{value:y.name,children:y.name},y.name))}),(0,c.jsx)(ke,{value:g.op,onChange:y=>N(b=>b.map((T,te)=>te===f?{...T,op:y.target.value}:T)),children:It.map(y=>(0,c.jsx)("option",{value:y,children:y},y))}),(0,c.jsx)(se,{value:g.value,style:{width:120},onChange:y=>N(b=>b.map((T,te)=>te===f?{...T,value:y.target.value}:T))}),(0,c.jsx)(oe,{icon:"x",title:t("delete"),size:10,onClick:()=>N(y=>y.filter((b,T)=>T!==f))})]},f)),(0,c.jsxs)(O,{size:"sm",onClick:()=>N(g=>g.concat({column:Ie[0]?.name??"",op:"=",value:""})),children:[(0,c.jsx)(S,{name:"plus",size:10}),t("addCondition")]}),(0,c.jsx)(O,{size:"sm",variant:"primary",onClick:()=>{F(gt(n,{joiner:j,conditions:A})),v(1)},children:t("apply")})]}):null,(0,c.jsxs)("div",{className:"dg-grid-wrap",children:[k&&!V?(0,c.jsx)("div",{className:"dg-sqlmsg",children:(0,c.jsx)(we,{label:t("loading")})}):null,V&&Ce.length===0?(0,c.jsx)(ye,{title:t("emptyTable")}):null,V&&Ce.length>0?(0,c.jsxs)("table",{className:"dg-grid",ref:yt,tabIndex:0,onKeyDown:mn,children:[(0,c.jsx)("thead",{children:(0,c.jsxs)("tr",{children:[(0,c.jsx)("th",{className:"dg-rownum",children:"#"}),pn,(0,c.jsx)("th",{style:{width:26}})]})}),(0,c.jsx)("tbody",{children:Ce.map((g,f)=>(0,c.jsxs)("tr",{children:[(0,c.jsx)("td",{className:`dg-rownum${Te?"":" dg-rownum-editable"}`,title:Te?void 0:t("editRow"),onClick:()=>gn(f),children:(u-1)*h+f+1}),Le.map((y,b)=>{let T=We(g[y.name],t("null")),te=R&&f>=R.top&&f<=R.bottom&&b>=R.left&&b<=R.right;return E&&E.row===f&&E.column===b?(0,c.jsx)("td",{className:"dg-cell-editing",children:(0,c.jsx)("input",{autoFocus:!0,value:E.value,onChange:ae=>J({...E,value:ae.target.value}),onBlur:()=>{xt(f,b,g[y.name])},onKeyDown:ae=>{ae.key==="Enter"&&(ae.preventDefault(),xt(f,b,g[y.name])),ae.key==="Escape"&&J(null)}})},y.name):(0,c.jsx)("td",{className:`${te?"dg-cell-selected":""}${T.isNull?" dg-null":""}${/int|numeric|decimal|real|double|float|money/i.test(y.type??"")?" dg-cell-num":""}`,title:T.isNull?t("null"):T.text,onMouseDown:ae=>{Ye.current=!0,yt.current?.focus(),rt(f,b,ae.shiftKey);let ee=()=>{Ye.current=!1,window.removeEventListener("mouseup",ee)};window.addEventListener("mouseup",ee)},onMouseEnter:()=>{Ye.current&&rt(f,b,!1)},onDoubleClick:()=>{if(Te)return a(t("noPrimaryKey"),"error");J({row:f,column:b,value:T.isNull?"":String(g[y.name])})},children:T.text},y.name)}),(0,c.jsx)("td",{children:(0,c.jsx)(oe,{icon:"trash",title:t("deleteRow"),size:11,onClick:()=>{dn(f)}})})]},f))})]}):null]}),(0,c.jsxs)("div",{className:"dg-pager",children:[(0,c.jsx)(oe,{icon:"chevronLeft",title:t("prev"),size:11,disabled:u<=1,onClick:()=>v(g=>Math.max(1,g-1))}),(0,c.jsx)("span",{children:ve(t("page"),{page:u,pages:st})}),(0,c.jsx)(oe,{icon:"chevron",title:t("next"),size:11,disabled:u>=st,onClick:()=>v(g=>Math.min(st,g+1))}),(0,c.jsx)("div",{className:"dg-spacer"}),Me&&Me.cells>0?(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("span",{className:"dg-chip",children:ve(t("selection"),{n:Me.cells})}),Me.count>0?(0,c.jsxs)("span",{className:"dg-chip",children:[t("sum")," ",(0,c.jsx)("b",{children:Me.sum.toFixed(2)})]}):null,Me.count>0?(0,c.jsxs)("span",{className:"dg-chip",children:[t("avg")," ",(0,c.jsx)("b",{children:Me.avg.toFixed(2)})]}):null]}):null,(0,c.jsx)("span",{children:t("pageSize")}),(0,c.jsx)(ke,{value:String(h),onChange:g=>{L(Number(g.target.value)),v(1)},children:zn.map(g=>(0,c.jsx)("option",{value:String(g),children:g},g))})]}),he?(0,c.jsx)(Ke,{x:he.x,y:he.y,onClose:()=>Pe(null),items:[...(V?.columns??[]).map(g=>{let f=!o.includes(g.name);return{label:g.name,icon:f?"check":void 0,onClick:()=>r(y=>y.includes(g.name)?y.filter(b=>b!==g.name):y.concat(g.name))}}),...o.length>0?[{separator:!0},{label:t("showAll"),icon:"columns",onClick:()=>r([])}]:[]]}):null,me?(0,c.jsx)(Ke,{x:me.x,y:me.y,onClose:()=>ie(null),items:[{label:t("exportCsv"),onClick:()=>{He("csv")}},{label:t("exportJson"),onClick:()=>{He("json")}},{label:t("exportInsert"),onClick:()=>{He("insert")}},{label:t("exportMarkdown"),onClick:()=>{He("markdown")}}]}):null,m?(0,c.jsx)(Ee,{title:`${t("editRow")} \xB7 ${(u-1)*h+m.rowIndex+1}`,width:560,busy:G,onClose:()=>B(null),footer:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(O,{onClick:()=>B(null),children:t("cancel")}),(0,c.jsx)(O,{variant:"primary",disabled:G,onClick:()=>{un()},children:t("save")})]}),children:(0,c.jsx)("div",{className:"dg-form",children:sn.map(g=>{let f=m.draft[g.name]??"",y=b=>B(T=>T&&{...T,draft:{...T.draft,[g.name]:b}});return(0,c.jsx)(ge,{label:`${g.name}${g.primaryKey?" \xB7 PK":""}`,children:$n(g.type)?(0,c.jsx)(Ot,{rows:3,value:f,onChange:b=>y(b.target.value)}):(0,c.jsx)(se,{value:f,placeholder:g.nullable?t("null"):"",onChange:b=>y(b.target.value)})},g.name)})})}):null]})}function Pn({t,meta:e,error:n,onRefresh:a}){let l=e;return n?(0,c.jsx)(ue,{tone:"error",children:n}):l?(0,c.jsxs)("div",{className:"dg-struct",children:[(0,c.jsxs)("div",{className:"dg-struct-col dg-struct-col-fields",children:[(0,c.jsxs)("div",{className:"dg-struct-head",children:[t("columns"),(0,c.jsx)("span",{className:"dg-badge",children:l.columns.length}),(0,c.jsx)("div",{className:"dg-spacer"}),(0,c.jsx)(oe,{icon:"refresh",title:t("refresh"),size:11,onClick:a})]}),(0,c.jsx)("div",{className:"dg-struct-body",style:{padding:0},children:(0,c.jsxs)("table",{className:"dg-grid dg-grid-fixed",style:{width:"100%"},children:[(0,c.jsx)("thead",{children:(0,c.jsxs)("tr",{children:[(0,c.jsx)("th",{style:{width:"30%"},children:t("name")}),(0,c.jsx)("th",{style:{width:"34%"},children:t("type")}),(0,c.jsx)("th",{style:{width:"12%"},children:t("nullable")}),(0,c.jsx)("th",{style:{width:"24%"},children:t("default")})]})}),(0,c.jsx)("tbody",{children:l.columns.map(i=>(0,c.jsxs)("tr",{children:[(0,c.jsx)("td",{children:(0,c.jsxs)("span",{className:"dg-row",children:[i.primaryKey?(0,c.jsx)(S,{name:"key",size:10}):null,(0,c.jsx)("span",{className:"dg-mono dg-truncate",children:i.name})]})}),(0,c.jsx)("td",{className:"dg-mono dg-truncate",title:i.type,children:i.type}),(0,c.jsx)("td",{children:i.nullable?"YES":"NO"}),(0,c.jsx)("td",{className:"dg-mono dg-truncate",title:i.defaultValue??"",children:i.defaultValue===null?"\u2014":String(i.defaultValue)})]},i.name))})]})})]}),(0,c.jsxs)("div",{className:"dg-struct-col dg-struct-col-indexes",children:[(0,c.jsxs)("div",{className:"dg-struct-head",children:[t("indexes"),(0,c.jsx)("span",{className:"dg-badge",children:l.indexes.length})]}),(0,c.jsx)("div",{className:"dg-struct-body",children:l.indexes.length===0?(0,c.jsx)("div",{className:"dg-muted",children:t("noIndexes")}):l.indexes.map(i=>(0,c.jsxs)("div",{className:"dg-idx",children:[i.primary?(0,c.jsx)(S,{name:"key",size:10}):null,(0,c.jsx)("span",{className:"dg-mono",children:i.name}),(0,c.jsx)("span",{className:"dg-tag",children:i.unique?"unique":"index"}),(0,c.jsx)("span",{className:"dg-muted dg-truncate",children:i.columns.join(", ")})]},i.name))})]}),(0,c.jsxs)("div",{className:"dg-struct-col dg-struct-col-ddl",children:[(0,c.jsx)("div",{className:"dg-struct-head",children:t("ddl")}),(0,c.jsx)("div",{className:"dg-struct-body",children:(0,c.jsx)("pre",{className:"dg-pre",children:l.ddl||"\u2014"})})]})]}):(0,c.jsx)("div",{className:"dg-sqlmsg",children:(0,c.jsx)(we,{label:t("loading")})})}function en(t,e){return`SELECT * FROM ${Ae(t,e)} LIMIT 100;`}var De=require("react");var $=require("react/jsx-runtime"),qn={red:"var(--dsw-alias-state-error-primary)",yellow:"var(--dsw-alias-state-warn-primary)",green:"var(--dsw-alias-state-success-primary)"};function tn(t){let{store:e,t:n}=t,a=fe(e.connections),l=fe(e.catalog),[i,d]=(0,De.useState)(""),[u,v]=(0,De.useState)(()=>new Set),[h,L]=(0,De.useState)(()=>new Set),[D,P]=(0,De.useState)(()=>new Set),x=(q,R)=>R(Z=>{let E=new Set(Z);return E.has(q)?E.delete(q):E.add(q),E}),F=i.trim().toLowerCase(),z=(0,De.useMemo)(()=>{let q=new Map;for(let R of a.items){let Z=R.group||n("noGroups"),E=q.get(Z)??[];E.push(R),q.set(Z,E)}return[...q.entries()].sort((R,Z)=>R[0].localeCompare(Z[0]))},[a.items,n]),Q=async q=>{e.connections.select(q.id);let R=e.connections.session(q.id).status;if(R==="open"||R==="opening"){x(q.id,v);return}v(Z=>new Set(Z).add(q.id)),await e.connections.connect(q.id)},A=async(q,R)=>{t.onSelectDatabase(q,R);let Z=`${q.id}|${R.name}`;L(E=>new Set(E).add(Z)),await e.catalog.loadRelations(q.id,R.name,R.schemas[0]??"")},N=(q,R,Z,E,J)=>(0,$.jsxs)("div",{className:"dg-trow",style:{paddingLeft:J*13+4},title:`${E.name}${E.rows!==null?` \xB7 ${E.rows} rows`:""}`,onClick:()=>t.onOpenTable(q,R,Z,E),children:[(0,$.jsx)("span",{className:"dg-twist"}),(0,$.jsx)("span",{className:"dg-ticon",children:(0,$.jsx)(S,{name:E.kind==="view"?"view":"table",size:11})}),(0,$.jsx)("span",{className:"dg-tlabel",children:E.name}),E.rows!==null?(0,$.jsx)("span",{className:"dg-badge",children:E.rows}):null]},`${q.id}|${R.name}|${Z}|${E.name}`),j=(q,R)=>{let Z=`${q.id}|${R.name}`,E=h.has(Z),J=R.schemas.length?R.schemas:[""];return(0,$.jsxs)("div",{children:[(0,$.jsxs)("div",{className:`dg-trow dg-trow-db${t.selectedDatabaseKey===Z?" dg-trow-active":""}`,title:R.name,onClick:()=>{A(q,R)},onContextMenu:X=>{X.preventDefault(),t.onDatabaseMenu(X,q,R)},children:[(0,$.jsx)("span",{className:`dg-twist${E?" dg-twist-open":""}`,onClick:X=>{X.stopPropagation(),x(Z,L),E||e.catalog.loadRelations(q.id,R.name,J[0]??"")},children:(0,$.jsx)(S,{name:"chevron",size:9})}),(0,$.jsx)("span",{className:"dg-ticon",children:(0,$.jsx)(S,{name:"database",size:11})}),(0,$.jsx)("span",{className:"dg-tlabel",children:R.name}),R.schemas.length>1?(0,$.jsx)("span",{className:"dg-badge",children:R.schemas.length}):null]}),E?J.map(X=>{let ce=`${Z}|${X}`,me=!X||D.has(ce),ie=l.relations[`${q.id}|${R.name}|${X}`]??[],Ne=l.loading[`${q.id}|${R.name}|${X}`]===!0;return(0,$.jsxs)("div",{children:[X?(0,$.jsxs)("div",{className:"dg-trow",style:{paddingLeft:17},onClick:()=>{x(ce,P),me||e.catalog.loadRelations(q.id,R.name,X)},children:[(0,$.jsx)("span",{className:`dg-twist${me?" dg-twist-open":""}`,children:(0,$.jsx)(S,{name:"chevron",size:9})}),(0,$.jsx)("span",{className:"dg-ticon",children:(0,$.jsx)(S,{name:"folder",size:11})}),(0,$.jsx)("span",{className:"dg-tlabel",children:X})]}):null,me?Ne&&ie.length===0?(0,$.jsx)("div",{className:"dg-muted",style:{padding:`2px 8px 2px ${(X?3:2)*13+16}px`},children:n("loading")}):ie.map(p=>N(q,R,X,p,X?3:2)):null]},X||"_default")}):null]},Z)},[Y,V]=(t.selectedDatabaseKey||"").split("|"),ne=a.items.find(q=>q.id===Y),k=ne?ne.engine!=="redis":!1,U=!!(ne&&V&&k),re=ne&&V?e.connections.session(ne.id).databases.find(q=>q.name===V)??{name:V,schemas:[""]}:null;return(0,$.jsxs)("div",{className:"dg-tree",children:[(0,$.jsxs)("div",{className:"dg-panehead",children:[(0,$.jsx)(S,{name:"database",size:11}),n("connections"),(0,$.jsx)("span",{className:"dg-badge",children:a.items.length}),(0,$.jsx)("div",{className:"dg-spacer"}),(0,$.jsx)(oe,{icon:"refresh",title:n("refresh"),size:11,onClick:()=>{e.connections.load(),e.meta.load()}})]}),(0,$.jsxs)("div",{className:"dg-row",style:{padding:"4px 6px",gap:4},children:[(0,$.jsxs)("div",{className:"dg-search",children:[(0,$.jsx)(S,{name:"search",size:10}),(0,$.jsx)("input",{value:i,placeholder:n("search"),onChange:q=>d(q.target.value)})]}),U&&t.onNewQuery&&ne&&re?(0,$.jsxs)(O,{size:"sm",variant:"tonal",title:n("newQuery"),onClick:()=>t.onNewQuery?.(ne,re),children:[(0,$.jsx)(S,{name:"play",size:10}),n("newQuery")]}):null]}),(0,$.jsxs)("div",{className:"dg-tree-scroll",children:[a.loading&&a.items.length===0?(0,$.jsx)("div",{className:"dg-muted",style:{padding:8},children:n("loading")}):null,a.error?(0,$.jsx)("div",{className:"dg-banner dg-banner-error",children:a.error}):null,z.map(([q,R])=>{let Z=R.filter(E=>!F||E.name.toLowerCase().includes(F)?!0:e.connections.session(E.id).databases.some(X=>X.name.toLowerCase().includes(F)));return Z.length===0?null:(0,$.jsxs)("div",{children:[(0,$.jsxs)("div",{className:"dg-group",children:[(0,$.jsx)("span",{className:"dg-twist"}),(0,$.jsx)("span",{className:"dg-truncate",children:q}),(0,$.jsx)("span",{className:"dg-badge",children:Z.length})]}),Z.map(E=>{let J=e.connections.session(E.id),X=u.has(E.id)&&J.status==="open";return(0,$.jsxs)("div",{children:[(0,$.jsxs)("div",{className:`dg-trow${a.activeId===E.id?" dg-trow-active":""}`,onClick:()=>{Q(E)},onContextMenu:ce=>{ce.preventDefault(),t.onConnectionMenu(ce,E)},title:`${E.name} \xB7 ${E.engine}`,children:[(0,$.jsx)("span",{className:`dg-twist${X?" dg-twist-open":""}`,children:(0,$.jsx)(S,{name:"chevron",size:9})}),E.color!=="none"?(0,$.jsx)("span",{className:"dg-colorbar",style:{background:qn[E.color]}}):null,(0,$.jsx)("span",{className:"dg-ticon",children:(0,$.jsx)(S,{name:"database",size:12})}),(0,$.jsx)("span",{className:"dg-tlabel",children:E.name}),(0,$.jsx)("span",{className:"dg-badge",children:E.engine}),(0,$.jsx)(Ft,{status:J.status})]}),J.status==="opening"?(0,$.jsxs)("div",{className:"dg-muted dg-hint",style:{padding:"2px 8px 2px 30px"},children:[n("connect"),"\u2026"]}):null,J.status==="error"?(0,$.jsx)("div",{className:"dg-muted dg-hint",style:{padding:"2px 8px 2px 30px"},children:J.error||n("error")}):null,X?J.databases.map(ce=>j(E,ce)):null]},E.id)})]},q)}),!a.loading&&a.items.length===0?(0,$.jsx)("div",{className:"dg-muted dg-hint",style:{padding:10},children:n("selectConnection")}):null]})]})}var C=require("react/jsx-runtime"),Ln=[{id:"tables",labelKey:"tables",icon:"table",target:"relations",relation:"table"},{id:"views",labelKey:"views",icon:"view",target:"relations",relation:"view"},{id:"functions",labelKey:"functions",icon:"function",target:"routines"},{id:"users",labelKey:"users",icon:"user",target:"accounts"},{id:"queries",labelKey:"queries",icon:"bookmark",target:"queries"}];function nn({t}){let e=t??(o=>o),[n]=(0,Se.useState)(()=>new _e),a=fe(n.connections),l=fe(n.meta),i=fe(n.tabs),[d,u]=(0,Se.useState)(null),[v,h]=(0,Se.useState)(null),[L,D]=(0,Se.useState)(null),[P,x]=(0,Se.useState)(null),[F,z]=(0,Se.useState)(null),[Q,A]=(0,Se.useState)(262);(0,Se.useEffect)(()=>{n.bootstrap()},[n]),(0,Se.useEffect)(()=>{if(!F)return;let o=setTimeout(()=>z(null),3600);return()=>clearTimeout(o)},[F]);let N=(o,r="info")=>z({message:o,tone:r}),j=o=>a.items.find(r=>r.id===o),Y=o=>j(o)?.engine??"sqlite",V=(o,r)=>{let m=r.schemas[0]??"";u({connectionId:o.id,database:r.name,schema:m}),n.catalog.loadRelations(o.id,r.name,m),n.tabs.open({id:`relations:${o.id}:${r.name}:${m}:table`,kind:"relations",connectionId:o.id,database:r.name,schema:m,relation:"table",title:r.name})},ne=(o,r)=>{u({connectionId:o.id,database:r.name,schema:r.schemas[0]??""}),n.tabs.open({id:`overview:${o.id}:${r.name}`,kind:"overview",connectionId:o.id,database:r.name,title:r.name})},k=(o,r,m,B)=>{n.tabs.open({id:`table:${o.id}:${r}:${m}:${B.name}`,kind:"table",connectionId:o.id,database:r,schema:m,table:B.name,tableKind:B.kind,title:B.name})},U=(o,r="table")=>{if(o==="queries"){n.tabs.open({id:"queries",kind:"queries",connectionId:"",database:"",schema:"",title:e("queries")});return}if(!d)return N(e("selectDatabase"),"info");if(o==="accounts"){n.tabs.open({id:`accounts:${d.connectionId}`,kind:"accounts",connectionId:d.connectionId,database:d.database,schema:"",title:e("users")});return}if(o==="relations"){n.tabs.open({id:`relations:${d.connectionId}:${d.database}:${d.schema}:${r}`,kind:"relations",connectionId:d.connectionId,database:d.database,schema:d.schema,relation:r,title:d.database});return}n.tabs.open({id:`${o}:${d.connectionId}:${d.database}:${d.schema}`,kind:o,connectionId:d.connectionId,database:d.database,schema:d.schema,title:e(o==="routines"?"functions":"users")})},re=(o,r,m)=>{let B=o??(d?j(d.connectionId):null);if(!B||B.engine==="redis")return;let G=r??(d&&d.connectionId===B.id?d.database:n.connections.session(B.id).databases[0]?.name??"");if(!G)return;let de=i.tabs.filter(he=>he.kind==="sql").length+1;n.tabs.open({id:`sql:${B.id}:${G}:${Date.now()}`,kind:"sql",connectionId:B.id,database:G,title:`${e("query")} ${de} (${G})`,initialSql:m??""})},q=o=>{let r=j(o.connectionId)??a.items[0];if(!r)return h({kind:"connection"});n.tabs.open({id:`sql:saved:${o.id}:${Date.now()}`,kind:"sql",connectionId:r.id,database:o.database,title:o.name,initialSql:o.sql})},R=async o=>{let r=v&&v.kind==="connection"?v.initial:void 0;if(r)await n.connections.update(r.id,o),n.tabs.closeConnection(r.id),N(e("saved"),"success");else{let m=await n.connections.create(o);N(m.ok?ve(e("testOk"),{version:m.serverVersion??"",ms:m.latencyMs??0}):e("saved"),m.ok?"success":"info")}h(null)},Z=(o,r)=>{let m=n.connections.session(r.id).status;x({x:o.clientX,y:o.clientY,items:[m==="open"?{label:e("disconnect"),icon:"unplug",onClick:()=>{n.connections.disconnect(r.id)}}:{label:e("connect"),icon:"plug",onClick:()=>{n.connections.connect(r.id)}},{label:e("test"),icon:"check",onClick:()=>{n.connections.test(r.id).then(B=>N(ve(e("testOk"),{version:B.serverVersion??"",ms:B.latencyMs??0}),"success"),B=>N(B instanceof Error?B.message:String(B),"error"))}},{separator:!0},...r.engine!=="redis"?[{label:e("newQuery"),icon:"play",onClick:()=>re(r)}]:[],{label:e("edit"),icon:"pencil",onClick:()=>h({kind:"connection",initial:r})},{label:e("refresh"),icon:"refresh",onClick:()=>{n.connections.reloadDatabases(r.id)}},{separator:!0},{label:e("delete"),icon:"trash",danger:!0,onClick:()=>D(r)}]})},E=(o,r,m)=>{x({x:o.clientX,y:o.clientY,items:[{label:e("overview"),icon:"info",onClick:()=>ne(r,m)},{label:e("tables"),icon:"table",onClick:()=>{u({connectionId:r.id,database:m.name,schema:m.schemas[0]??""}),U("relations","table")}},{label:e("views"),icon:"view",onClick:()=>{u({connectionId:r.id,database:m.name,schema:m.schemas[0]??""}),U("relations","view")}},{label:e("functions"),icon:"function",onClick:()=>{u({connectionId:r.id,database:m.name,schema:m.schemas[0]??""}),U("routines")}},{separator:!0},...r.engine!=="redis"?[{label:e("newQuery"),icon:"play",onClick:()=>re(r,m.name)}]:[]]})},J=n.bindings(),X=d?`${d.connectionId}|${d.database}`:"",ce=i.tabs.find(o=>o.id===i.activeId)??null,me=(0,C.jsxs)("div",{className:"dg-toolbar",children:[(0,C.jsxs)("div",{className:"dg-brand",children:[(0,C.jsx)("span",{className:"dg-brand-badge",children:(0,C.jsx)(S,{name:"database",size:15})}),(0,C.jsx)("span",{className:"dg-brand-title",children:e("panel")})]}),(0,C.jsx)("div",{className:"dg-toolbar-divider"}),(0,C.jsx)("div",{className:"dg-toolgroup dg-obj-pills",children:Ln.map(o=>(0,C.jsxs)(O,{size:"sm",variant:"ghost",onClick:()=>U(o.target,o.relation),title:e(o.labelKey),children:[(0,C.jsx)(S,{name:o.icon,size:11}),e(o.labelKey)]},o.id))}),(0,C.jsx)("div",{className:"dg-spacer"}),(0,C.jsxs)("button",{type:"button",className:`dg-binding-chip${J.length>0?" dg-binding-chip-active":""}`,onClick:()=>h({kind:"workspaces"}),title:J.length>0?`${e("boundProject")}: ${J.map(o=>o.connectionName||o.connectionId).join(", ")}`:e("projectUnbound"),children:[(0,C.jsx)("span",{className:`dg-dot${J.length>0?" dg-dot-open":""}`}),(0,C.jsx)(S,{name:"link",size:11}),(0,C.jsx)("span",{className:"dg-binding-chip-label",children:J.length>0?`${e("boundProject")}: ${J[0].connectionName||J[0].connectionId}${J.length>1?` (+${J.length-1})`:""}`:e("workspaces")})]}),(0,C.jsx)(oe,{icon:"refresh",title:e("refresh"),onClick:()=>{n.connections.load(),n.meta.load()}}),(0,C.jsxs)(O,{className:"dg-btn-new-conn",onClick:()=>h({kind:"connection"}),title:e("newConnection"),children:[(0,C.jsx)(S,{name:"plus",size:11}),e("newConnection")]})]}),ie=i.tabs.length?(0,C.jsx)("div",{className:"dg-tabs",role:"tablist",children:i.tabs.map(o=>(0,C.jsxs)("div",{role:"tab",tabIndex:o.id===i.activeId?0:-1,"aria-selected":o.id===i.activeId,className:`dg-tab${o.id===i.activeId?" dg-tab-active":""}`,onClick:()=>n.tabs.activate(o.id),onKeyDown:r=>{if(r.key==="Enter"||r.key===" "){r.preventDefault(),n.tabs.activate(o.id);return}let m=r.key==="ArrowRight"?1:r.key==="ArrowLeft"?-1:0;if(m===0)return;r.preventDefault();let B=r.currentTarget.parentElement?.children,G=B?.length??0;if(!G)return;let de=i.tabs[(i.tabs.findIndex(he=>he.id===o.id)+m+G)%G];de&&(n.tabs.activate(de.id),B?.[i.tabs.indexOf(de)]?.focus())},title:o.title,children:[(0,C.jsx)(S,{name:o.kind==="table"?o.tableKind==="view"?"view":"table":o.kind==="sql"?"play":o.kind==="queries"?"bookmark":o.kind==="redis"?"database":"info",size:10}),(0,C.jsx)("span",{className:"dg-tab-label",children:o.title}),(0,C.jsx)("button",{type:"button",className:"dg-tab-close","aria-label":`${e("close")} ${o.title}`,onClick:r=>{r.stopPropagation(),n.tabs.close(o.id)},children:(0,C.jsx)(S,{name:"x",size:9})})]},o.id))}):null,Ne=i.tabs.map(o=>{if(o.id!==i.activeId)return null;let r=j(o.connectionId);switch(o.kind){case"overview":{let m=n.connections.session(o.connectionId).databases.find(B=>B.name===o.database);return m?(0,C.jsx)(Jt,{t:e,store:n,connectionId:o.connectionId,database:m,schemas:m.schemas,onOpenRelations:B=>U("relations",B),onNewQuery:()=>re(r,o.database)},o.id):null}case"table":return(0,C.jsx)(Zt,{t:e,tab:o,engine:Y(o.connectionId),notify:N,onNewQuery:()=>re(r,o.database)},o.id);case"sql":return(0,C.jsx)(Yt,{t:e,tab:o,tables:n.catalog.relationsOf(`${o.connectionId}|${o.database}|`).map(m=>m.name),notify:N,onSaved:()=>{n.queries.load()}},o.id);case"relations":return(0,C.jsx)(Wt,{t:e,store:n,connectionId:o.connectionId,database:o.database,schema:o.schema,kind:o.relation,onOpen:m=>{r&&k(r,o.database,o.schema,m)},onQuery:m=>re(r,o.database,en(Y(o.connectionId),m.name)),onNewQuery:()=>re(r,o.database),notify:N},o.id);case"routines":return(0,C.jsx)(Ut,{t:e,store:n,connectionId:o.connectionId,database:o.database,schema:o.schema},o.id);case"accounts":return(0,C.jsx)(_t,{t:e,store:n,connectionId:o.connectionId},o.id);case"queries":return(0,C.jsx)(Xt,{t:e,store:n,onOpen:q,notify:N},o.id);case"redis":return(0,C.jsx)(Gt,{t:e,tab:o,notify:N},o.id);default:return null}}),p=(0,C.jsxs)("div",{className:"dg-status",children:[a.activeId?(0,C.jsxs)("span",{className:"dg-status-item",children:[(0,C.jsx)(S,{name:"database",size:10}),(0,C.jsx)("b",{children:j(a.activeId)?.name??""}),(0,C.jsx)("span",{children:n.connections.session(a.activeId).version||j(a.activeId)?.engine||""})]}):(0,C.jsx)("span",{className:"dg-status-item",children:e("selectConnection")}),d?(0,C.jsxs)("span",{className:"dg-status-item",children:[(0,C.jsx)("span",{children:d.database}),d.schema?(0,C.jsxs)("span",{children:["\xB7 ",d.schema]}):null]}):null,(0,C.jsx)("div",{className:"dg-spacer"}),J.length>0?(0,C.jsxs)("span",{className:"dg-status-item",children:[e("boundProject"),": ",J.length]}):null,(0,C.jsx)("span",{className:"dg-status-item",children:ce?ce.kind:"ready"})]});return(0,C.jsxs)("div",{className:"dg-root",children:[(0,C.jsx)("style",{children:Qt}),me,l.error?(0,C.jsx)(ue,{tone:"error",onClose:()=>{n.meta.load()},children:l.error}):null,(0,C.jsxs)("div",{className:"dg-body",children:[(0,C.jsx)("div",{style:{width:Q,flex:`0 0 ${Q}px`,display:"flex",minWidth:0},children:(0,C.jsx)(tn,{store:n,t:e,selectedDatabaseKey:X,onSelectDatabase:V,onOpenTable:(o,r,m,B)=>k(o,r.name,m,B),onConnectionMenu:Z,onDatabaseMenu:E,onNewQuery:(o,r)=>re(o,r.name)})}),(0,C.jsx)(jt,{width:Q,setWidth:A,min:200,max:420}),(0,C.jsxs)("div",{className:"dg-main",children:[ie,i.tabs.length===0?(0,C.jsx)(ye,{title:e("selectConnection"),hint:e("agentHint"),children:(0,C.jsxs)("div",{className:"dg-welcome-actions",children:[(0,C.jsxs)(O,{className:"dg-btn-new-conn",onClick:()=>h({kind:"connection"}),children:[(0,C.jsx)(S,{name:"plus",size:11}),e("newConnection")]}),(0,C.jsxs)(O,{variant:"ghost",onClick:()=>h({kind:"workspaces"}),children:[(0,C.jsx)(S,{name:"link",size:11}),e("workspaces")]})]})}):null,Ne,F?(0,C.jsxs)("div",{className:`dg-toast${F.tone==="error"?" dg-toast-error":""}`,children:[(0,C.jsx)(S,{name:F.tone==="error"?"alert":"check",size:11}),(0,C.jsx)("span",{className:"dg-truncate",children:F.message})]}):null]})]}),p,v&&v.kind==="connection"?(0,C.jsx)(Vt,{t:e,engines:l.meta?.engines??[],initial:v.initial??null,onClose:()=>h(null),onSave:R}):null,v&&v.kind==="workspaces"?(0,C.jsx)(Ht,{t:e,store:n,onClose:()=>h(null),notify:N}):null,L?(0,C.jsx)(Ke,{x:window.innerWidth/2,y:window.innerHeight/2,onClose:()=>D(null),items:[{label:e("confirmDeleteConnection"),disabled:!0},{separator:!0},{label:e("cancel"),onClick:()=>D(null)},{label:e("delete"),icon:"trash",danger:!0,onClick:()=>{let o=L;D(null),n.connections.remove(o.id).catch(r=>N(r instanceof Error?r.message:String(r),"error"))}}]}):null,P?(0,C.jsx)(Ke,{x:P.x,y:P.y,items:P.items,onClose:()=>x(null)}):null]})}var Re=require("react/jsx-runtime"),Ge="grid",an="grid";function Bn({size:t=20,active:e}){return(0,Re.jsxs)("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none","aria-hidden":!0,focusable:"false",children:[(0,Re.jsx)("ellipse",{cx:"12",cy:"5.6",rx:"7.1",ry:"2.9",stroke:"currentColor",strokeWidth:1.5}),(0,Re.jsx)("path",{d:"M4.9 5.6v12.8c0 1.6 3.18 2.9 7.1 2.9s7.1-1.3 7.1-2.9V5.6",stroke:"currentColor",strokeWidth:1.5,strokeLinecap:"round"}),(0,Re.jsx)("path",{d:"M4.9 9.9c0 1.6 3.18 2.9 7.1 2.9s7.1-1.3 7.1-2.9",stroke:"currentColor",strokeWidth:1.5}),(0,Re.jsx)("path",{d:"M4.9 14.2c0 1.6 3.18 2.9 7.1 2.9s7.1-1.3 7.1-2.9",stroke:"currentColor",strokeWidth:1.5}),(0,Re.jsx)("rect",{x:"10.55",y:"9.55",width:"2.9",height:"10.9",rx:"1.2",fill:"var(--dsw-alias-brand-primary)",opacity:e===!1?.55:.9})]})}function An(t){t.effect(()=>t.locale.register(Ge,Ct),"grid: dictionaries");let e=t.locale.bind(Ge);t.slots.inject("main",()=>t.slots.register({name:"main",key:an,locale:Ge},nn)),t.slots.inject("sidebar.panellist",()=>t.slots.register({name:"sidebar.panellist",id:an,order:15,label:()=>e("panel"),locale:Ge},Bn))}var On={inject:["slots","locale"],apply:An};

    return module.exports.default || module.exports;
  },
});
