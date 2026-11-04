window.__ModuleLoader__.load({
  id: '@local/dsh-grid',
  factory(require) {
    const module = { exports: {} };
    const exports = module.exports;
"use strict";var rt=Object.defineProperty;var vn=Object.getOwnPropertyDescriptor;var hn=Object.getOwnPropertyNames;var fn=Object.prototype.hasOwnProperty;var bn=(t,e)=>{for(var n in e)rt(t,n,{get:e[n],enumerable:!0})},yn=(t,e,n,a)=>{if(e&&typeof e=="object"||typeof e=="function")for(let l of hn(e))!fn.call(t,l)&&l!==n&&rt(t,l,{get:()=>e[l],enumerable:!(a=vn(e,l))||a.enumerable});return t};var wn=t=>yn(rt({},"__esModule",{value:!0}),t);var Bn={};bn(Bn,{default:()=>On});module.exports=wn(Bn);var xn={meta:{title:"Grid",description:"Database workbench: connections with groups, colours and TLS modes, a schema browser, an editable data grid, a SQL console with completion, and saved queries \u2014 plus read-only database context for the agent."},panel:"Grid",connections:"Connections",workspaces:"Workspaces",noWorkspaces:"No workspace is registered in this profile yet.",databases:"Databases",newConnection:"New connection",newQuery:"New query",tables:"Tables",views:"Views",functions:"Functions",users:"Users",queries:"Queries",overview:"Overview",connect:"Connect",disconnect:"Disconnect",test:"Test",edit:"Edit",delete:"Delete",refresh:"Refresh",save:"Save",cancel:"Cancel",close:"Close",confirm:"Confirm",apply:"Apply",clear:"Clear",search:"Search\u2026",loading:"Loading\u2026",error:"Error",name:"Name",type:"Type",comment:"Comment",rows:"Rows",estimatedTotal:"The engine estimated this row count; Refresh asks for an exact count.",size:"Size",total:"Total",selectConnection:"Select a connection on the left to begin.",selectDatabase:"Select a database to list its objects.",emptyTables:"No tables or views in this database.",emptyTable:"This table is empty.",emptyResult:"The query returned no rows.",emptyObjects:"Nothing here yet.",data:"Data",structure:"Structure",columns:"Columns",indexes:"Indexes",ddl:"DDL",noIndexes:"No indexes.",nullable:"Nullable",default:"Default",primaryKey:"PK",insertRow:"Insert row",editRow:"Edit row",rowSaved:"Row saved",rowInserted:"Row inserted",insertRowFailed:"The row could not be inserted with its defaults.",deleteRow:"Delete row",confirmDelete:"Delete this row?",confirmDeleteConnection:"Delete this connection? Its saved password is removed too.",confirmDeleteKey:"Delete this key?",noPrimaryKey:"This table has no primary key, so rows cannot be located safely. Editing is disabled.",cellSaved:"Saved",deleted:"Deleted",saved:"Saved",copied:"Copied",page:"Page {page} of {pages}",pageSize:"Rows per page",prev:"Previous",next:"Next",selection:"Selection {n}",sum:"Sum",avg:"Avg",count:"Count",exportCsv:"Export CSV",exportJson:"Export JSON",exportInsert:"Export INSERT statements",exportMarkdown:"Export Markdown table",exportAs:"Export",importCsv:"Import CSV",importDone:"Imported {n} row(s)",importEmpty:"That file has no rows.",importNoColumns:"Open the table first so its column names are known.",importUnknownColumns:"The file has columns this table does not: {cols}",importFailed:"Imported {n} row(s), then stopped: {error}",exportTruncated:"Export limited to {n} rows",filter:"Filter",filterBuilder:"Filter builder",rawWhere:"Raw WHERE",addCondition:"Add condition",matchAll:"Match all",matchAny:"Match any",columnChooser:"Columns",showAll:"Show all",resetWidths:"Reset widths",run:"Run",cancelQuery:"Cancel",queryCancelled:"Cancelled",cancelUnsupported:"This engine cannot cancel a running statement.",runHint:"Ctrl/Cmd + Enter to run",explain:"Explain",beautify:"Beautify",history:"History",noHistory:"No queries yet.",result:"Result {n}",statementCount:"{n} statement(s)",queryOk:"{n} row(s) in {ms} ms",resultTruncated:"The result was capped: only the first 2 000 rows are shown.",queryFailed:"Failed after {ms} ms",affected:"{n} row(s) affected",noStatements:"Nothing to run.",completionHint:"Ctrl + Space for completion",readOnlyHint:"Read-only statements only",redisKeys:"Keys",redisPattern:"Pattern",redisType:"Type",scanMore:"Scan more",ttl:"TTL",noTtl:"no expiry",keyValue:"Value",command:"Command",commandHint:"e.g. GET user:1",reply:"Reply",deleteKey:"Delete key",newKey:"New key",setTtl:"Set TTL",rename:"Rename",editValue:"Edit value",saveQuery:"Save query",queryName:"Query name",querySaved:"Query saved",noQueries:"No saved queries yet. Save one from the SQL console, or ask the agent to.",openInEditor:"Open in editor",runQuery:"Run",source:"Source",bindProject:"Bind to this project",unbindProject:"Unbind project",projectBound:"This conversation can read {name} ({database}) without asking.",projectUnbound:"Not bound to this workspace. The agent has to ask which connection to use.",readOnlyForAgent:"Agent access is read-only",agentHint:"The agent can list, inspect and query these connections with grid_* tools, and save queries for you.",functionKind:"Function",procedureKind:"Procedure",returnType:"Returns",language:"Language",definition:"Definition",noRoutines:"No functions or procedures.",accountName:"User",accountHost:"Host",accountPlugin:"Plugin",accountLocked:"Locked",accountPrivileged:"Privileged",noAccounts:"No accounts are visible to this connection.",driverMissing:"The {engine} driver is not installed. Run `pnpm add {pkg}` in the plugin directory.",engineUnavailable:"Unavailable",testOk:"Connection works \xB7 {version} \xB7 {ms} ms",testFailed:"Connection failed: {error}",passwordKeep:"Leave blank to keep the saved password",engine:"Engine",host:"Host",port:"Port",user:"User",password:"Password",database:"Database",schema:"Schema",file:"Database file",redisDb:"Database index",color:"Environment colour",identity:"Identity",group:"Group",sslDisable:"TLS off",sslRequire:"TLS, certificate not verified",sslVerifyCa:"TLS, verify certificate chain",sslVerifyFull:"TLS, verify certificate and host name",connectionLost:"Connection lost \u2014 reconnect failed.",bannerTools:"The agent can inspect and query these connections.",writesEnabled:"Writes enabled for the agent",writesDisabled:"Read-only for the agent",unsaved:"Unsaved",copyName:"Copy name",openInQuery:"Open in query",tablesCount:"{n} table(s)",viewsCount:"{n} view(s)",routinesCount:"{n} routine(s)",server:"Server",updatedAt:"Updated",version:"Version",boundProject:"Project",noGroups:"Ungrouped"},kn={meta:{title:"Grid \u6570\u636E\u5E93",description:"\u6570\u636E\u5E93\u5DE5\u4F5C\u53F0\uFF1A\u8FDE\u63A5\uFF08\u5206\u7EC4+\u73AF\u5883\u8272\uFF09\u3001\u5E93\u8868\u6D4F\u89C8\u3001\u53EF\u7F16\u8F91\u6570\u636E\u7F51\u683C\u3001\u5E26\u8865\u5168\u7684 SQL \u63A7\u5236\u53F0\u3001\u67E5\u8BE2\u4FDD\u5B58\u4E0E\u5907\u4EFD\uFF0C\u5E76\u5411 Agent \u63D0\u4F9B\u53EA\u8BFB\u5E93\u4E0A\u4E0B\u6587\u3002"},panel:"\u6570\u636E\u5E93",connections:"\u8FDE\u63A5",workspaces:"\u5DE5\u4F5C\u533A",noWorkspaces:"\u8FD9\u4E2A profile \u91CC\u8FD8\u6CA1\u6709\u6CE8\u518C\u5DE5\u4F5C\u533A\u3002",databases:"\u6570\u636E\u5E93",newConnection:"\u65B0\u5EFA\u8FDE\u63A5",newQuery:"\u65B0\u5EFA\u67E5\u8BE2",tables:"\u8868",views:"\u89C6\u56FE",functions:"\u51FD\u6570",users:"\u7528\u6237",queries:"\u67E5\u8BE2",overview:"\u6982\u89C8",connect:"\u8FDE\u63A5",disconnect:"\u65AD\u5F00",test:"\u6D4B\u8BD5",edit:"\u7F16\u8F91",delete:"\u5220\u9664",refresh:"\u5237\u65B0",save:"\u4FDD\u5B58",cancel:"\u53D6\u6D88",close:"\u5173\u95ED",confirm:"\u786E\u5B9A",apply:"\u5E94\u7528",clear:"\u6E05\u7A7A",search:"\u641C\u7D22\u2026",loading:"\u52A0\u8F7D\u4E2D\u2026",error:"\u9519\u8BEF",name:"\u540D\u79F0",type:"\u7C7B\u578B",comment:"\u6CE8\u91CA",rows:"\u884C\u6570",estimatedTotal:"\u8BE5\u884C\u6570\u6765\u81EA\u5F15\u64CE\u4F30\u7B97\uFF1B\u70B9\u5237\u65B0\u53EF\u83B7\u53D6\u7CBE\u786E\u503C\u3002",size:"\u5927\u5C0F",total:"\u5408\u8BA1",selectConnection:"\u5728\u5DE6\u4FA7\u9009\u62E9\u4E00\u4E2A\u8FDE\u63A5\u5F00\u59CB\u3002",selectDatabase:"\u9009\u62E9\u4E00\u4E2A\u6570\u636E\u5E93\u6765\u5217\u51FA\u5B83\u7684\u5BF9\u8C61\u3002",emptyTables:"\u8FD9\u4E2A\u6570\u636E\u5E93\u91CC\u6CA1\u6709\u8868\u6216\u89C6\u56FE\u3002",emptyTable:"\u8FD9\u5F20\u8868\u8FD8\u6CA1\u6709\u6570\u636E\u3002",emptyResult:"\u67E5\u8BE2\u6CA1\u6709\u8FD4\u56DE\u4EFB\u4F55\u884C\u3002",emptyObjects:"\u8FD9\u91CC\u8FD8\u6CA1\u6709\u5185\u5BB9\u3002",data:"\u6570\u636E",structure:"\u7ED3\u6784",columns:"\u5B57\u6BB5",indexes:"\u7D22\u5F15",ddl:"DDL",noIndexes:"\u6CA1\u6709\u7D22\u5F15\u3002",nullable:"\u53EF\u7A7A",default:"\u9ED8\u8BA4\u503C",primaryKey:"\u4E3B\u952E",insertRow:"\u63D2\u5165\u884C",editRow:"\u7F16\u8F91\u884C",rowSaved:"\u884C\u5DF2\u4FDD\u5B58",rowInserted:"\u5DF2\u63D2\u5165\u4E00\u884C",insertRowFailed:"\u65E0\u6CD5\u7528\u9ED8\u8BA4\u503C\u63D2\u5165\u65B0\u884C\u3002",deleteRow:"\u5220\u9664\u884C",confirmDelete:"\u786E\u5B9A\u5220\u9664\u8FD9\u4E00\u884C\uFF1F",confirmDeleteConnection:"\u786E\u5B9A\u5220\u9664\u8FD9\u4E2A\u8FDE\u63A5\uFF1F\u4FDD\u5B58\u7684\u5BC6\u7801\u4E5F\u4F1A\u4E00\u5E76\u5220\u9664\u3002",confirmDeleteKey:"\u786E\u5B9A\u5220\u9664\u8FD9\u4E2A\u952E\uFF1F",noPrimaryKey:"\u8BE5\u8868\u6CA1\u6709\u4E3B\u952E\uFF0C\u65E0\u6CD5\u5B89\u5168\u5B9A\u4F4D\u884C\uFF0C\u7F16\u8F91\u5DF2\u7981\u7528\u3002",cellSaved:"\u5DF2\u4FDD\u5B58",deleted:"\u5DF2\u5220\u9664",saved:"\u5DF2\u4FDD\u5B58",copied:"\u5DF2\u590D\u5236",page:"\u7B2C {page} / {pages} \u9875",pageSize:"\u6BCF\u9875\u884C\u6570",prev:"\u4E0A\u4E00\u9875",next:"\u4E0B\u4E00\u9875",selection:"\u9009\u533A {n}",sum:"\u5408\u8BA1",avg:"\u5E73\u5747",count:"\u8BA1\u6570",exportCsv:"\u5BFC\u51FA CSV",exportJson:"\u5BFC\u51FA JSON",exportInsert:"\u5BFC\u51FA INSERT \u8BED\u53E5",exportMarkdown:"\u5BFC\u51FA Markdown \u8868\u683C",exportAs:"\u5BFC\u51FA",importCsv:"\u5BFC\u5165 CSV",importDone:"\u5DF2\u5BFC\u5165 {n} \u884C",importEmpty:"\u8FD9\u4E2A\u6587\u4EF6\u6CA1\u6709\u6570\u636E\u884C\u3002",importNoColumns:"\u8BF7\u5148\u6253\u5F00\u8BE5\u8868\uFF0C\u4EE5\u4FBF\u77E5\u9053\u5217\u540D\u3002",importUnknownColumns:"\u6587\u4EF6\u91CC\u6709\u672C\u8868\u4E0D\u5B58\u5728\u7684\u5217\uFF1A{cols}",importFailed:"\u5DF2\u5BFC\u5165 {n} \u884C\uFF0C\u968F\u540E\u4E2D\u65AD\uFF1A{error}",exportTruncated:"\u5BFC\u51FA\u4E0A\u9650\u4E3A {n} \u884C",filter:"\u7B5B\u9009",filterBuilder:"\u7B5B\u9009\u6784\u5EFA\u5668",rawWhere:"\u539F\u59CB WHERE",addCondition:"\u6DFB\u52A0\u6761\u4EF6",matchAll:"\u5168\u90E8\u6EE1\u8DB3",matchAny:"\u4EFB\u4E00\u6EE1\u8DB3",columnChooser:"\u5B57\u6BB5\u663E\u793A",showAll:"\u5168\u90E8\u663E\u793A",resetWidths:"\u91CD\u7F6E\u5217\u5BBD",run:"\u6267\u884C",cancelQuery:"\u53D6\u6D88\u6267\u884C",queryCancelled:"\u5DF2\u53D6\u6D88",cancelUnsupported:"\u8BE5\u5F15\u64CE\u65E0\u6CD5\u53D6\u6D88\u6B63\u5728\u6267\u884C\u7684\u8BED\u53E5\u3002",runHint:"Ctrl/Cmd + Enter \u6267\u884C",explain:"\u89E3\u91CA",beautify:"\u7F8E\u5316",history:"\u5386\u53F2",noHistory:"\u8FD8\u6CA1\u6709\u6267\u884C\u8FC7\u67E5\u8BE2\u3002",result:"\u7ED3\u679C {n}",statementCount:"{n} \u6761\u8BED\u53E5",queryOk:"{n} \u884C\uFF0C\u8017\u65F6 {ms} \u6BEB\u79D2",resultTruncated:"\u7ED3\u679C\u5DF2\u622A\u65AD\uFF1A\u53EA\u663E\u793A\u524D 2 000 \u884C\u3002",queryFailed:"\u5931\u8D25\uFF0C\u8017\u65F6 {ms} \u6BEB\u79D2",affected:"\u5F71\u54CD {n} \u884C",noStatements:"\u6CA1\u6709\u53EF\u6267\u884C\u7684\u5185\u5BB9\u3002",completionHint:"Ctrl + Space \u5524\u8D77\u8865\u5168",readOnlyHint:"\u4EC5\u53EA\u8BFB\u8BED\u53E5",redisKeys:"\u952E",redisPattern:"\u5339\u914D\u6A21\u5F0F",redisType:"\u7C7B\u578B",scanMore:"\u7EE7\u7EED\u626B\u63CF",ttl:"\u5269\u4F59\u65F6\u95F4",noTtl:"\u6C38\u4E0D\u8FC7\u671F",keyValue:"\u503C",command:"\u547D\u4EE4",commandHint:"\u4F8B\u5982 GET user:1",reply:"\u8FD4\u56DE",deleteKey:"\u5220\u9664\u952E",newKey:"\u65B0\u5EFA\u952E",setTtl:"\u8BBE\u7F6E TTL",rename:"\u91CD\u547D\u540D",editValue:"\u7F16\u8F91\u503C",saveQuery:"\u4FDD\u5B58\u67E5\u8BE2",queryName:"\u67E5\u8BE2\u540D\u79F0",querySaved:"\u67E5\u8BE2\u5DF2\u4FDD\u5B58",noQueries:"\u8FD8\u6CA1\u6709\u4FDD\u5B58\u7684\u67E5\u8BE2\u3002\u53EF\u4EE5\u5728 SQL \u63A7\u5236\u53F0\u91CC\u4FDD\u5B58\uFF0C\u4E5F\u53EF\u4EE5\u8BA9 Agent \u5E2E\u4F60\u4FDD\u5B58\u3002",openInEditor:"\u5728\u7F16\u8F91\u5668\u4E2D\u6253\u5F00",runQuery:"\u6267\u884C",source:"\u6765\u6E90",bindProject:"\u7ED1\u5B9A\u5230\u5F53\u524D\u9879\u76EE",unbindProject:"\u89E3\u9664\u9879\u76EE\u7ED1\u5B9A",projectBound:"\u672C\u6B21\u5BF9\u8BDD\u53EF\u4EE5\u76F4\u63A5\u8BFB\u53D6 {name}\uFF08{database}\uFF09\uFF0C\u65E0\u9700\u53CD\u590D\u786E\u8BA4\u3002",projectUnbound:"\u5C1A\u672A\u7ED1\u5B9A\u5230\u5F53\u524D\u5DE5\u4F5C\u533A\uFF0CAgent \u9700\u8981\u5148\u8BE2\u95EE\u4F7F\u7528\u54EA\u4E2A\u8FDE\u63A5\u3002",readOnlyForAgent:"Agent \u8BBF\u95EE\u4E3A\u53EA\u8BFB",agentHint:"Agent \u53EF\u4EE5\u901A\u8FC7 grid_* \u5DE5\u5177\u5217\u51FA\u3001\u68C0\u67E5\u3001\u67E5\u8BE2\u8FD9\u4E9B\u8FDE\u63A5\uFF0C\u4E5F\u80FD\u66FF\u4F60\u4FDD\u5B58\u67E5\u8BE2\u3002",functionKind:"\u51FD\u6570",procedureKind:"\u5B58\u50A8\u8FC7\u7A0B",returnType:"\u8FD4\u56DE\u7C7B\u578B",language:"\u8BED\u8A00",definition:"\u5B9A\u4E49",noRoutines:"\u6CA1\u6709\u51FD\u6570\u6216\u5B58\u50A8\u8FC7\u7A0B\u3002",accountName:"\u7528\u6237",accountHost:"\u4E3B\u673A",accountPlugin:"\u8BA4\u8BC1\u63D2\u4EF6",accountLocked:"\u5DF2\u9501\u5B9A",accountPrivileged:"\u7279\u6743",noAccounts:"\u8BE5\u8FDE\u63A5\u770B\u4E0D\u5230\u7528\u6237\u5217\u8868\u3002",driverMissing:"\u672A\u5B89\u88C5 {engine} \u9A71\u52A8\uFF0C\u8BF7\u5728\u63D2\u4EF6\u76EE\u5F55\u6267\u884C `pnpm add {pkg}`\u3002",engineUnavailable:"\u4E0D\u53EF\u7528",testOk:"\u8FDE\u63A5\u6210\u529F \xB7 {version} \xB7 {ms} \u6BEB\u79D2",testFailed:"\u8FDE\u63A5\u5931\u8D25\uFF1A{error}",passwordKeep:"\u7559\u7A7A\u8868\u793A\u4FDD\u7559\u5DF2\u4FDD\u5B58\u7684\u5BC6\u7801",engine:"\u5F15\u64CE",host:"\u4E3B\u673A",port:"\u7AEF\u53E3",user:"\u7528\u6237\u540D",password:"\u5BC6\u7801",database:"\u6570\u636E\u5E93",schema:"Schema",file:"\u6570\u636E\u5E93\u6587\u4EF6",redisDb:"\u5E93\u5E8F\u53F7",color:"\u73AF\u5883\u8272",identity:"\u6807\u8BC6",group:"\u5206\u7EC4",sslDisable:"\u5173\u95ED TLS",sslRequire:"TLS\uFF0C\u4E0D\u6821\u9A8C\u8BC1\u4E66",sslVerifyCa:"TLS\uFF0C\u6821\u9A8C\u8BC1\u4E66\u94FE",sslVerifyFull:"TLS\uFF0C\u6821\u9A8C\u8BC1\u4E66\u4E0E\u4E3B\u673A\u540D",connectionLost:"\u8FDE\u63A5\u5DF2\u65AD\u5F00\uFF0C\u91CD\u8FDE\u5931\u8D25\u3002",bannerTools:"Agent \u53EF\u4EE5\u68C0\u67E5\u5E76\u67E5\u8BE2\u8FD9\u4E9B\u8FDE\u63A5\u3002",writesEnabled:"Agent \u53EF\u5199",writesDisabled:"Agent \u53EA\u8BFB",unsaved:"\u672A\u4FDD\u5B58",copyName:"\u590D\u5236\u540D\u79F0",openInQuery:"\u5728\u67E5\u8BE2\u4E2D\u6253\u5F00",tablesCount:"{n} \u5F20\u8868",viewsCount:"{n} \u4E2A\u89C6\u56FE",routinesCount:"{n} \u4E2A\u4F8B\u7A0B",server:"\u670D\u52A1\u5668",updatedAt:"\u66F4\u65B0\u65F6\u95F4",version:"\u7248\u672C",boundProject:"\u9879\u76EE",noGroups:"\u672A\u5206\u7EC4"},Nt={en:xn,zh:kn};var Ce=require("react");var it=new Set("select from where group by order having limit offset join inner left right full outer cross on as and or not in is null like ilike between exists case when then else end union all distinct insert into values update set delete create table view index alter add drop truncate primary key foreign references unique default constraint cascade returning with recursive asc desc explain analyze show describe use begin commit rollback transaction if temporary materialized over partition window rows range current row unbounded preceding following fetch next only for share nowait".split(/\s+/)),dt=new Set("count sum avg min max coalesce nullif cast convert round floor ceil abs length lower upper trim ltrim rtrim substr substring replace concat concat_ws now current_timestamp current_date current_time date_trunc extract date_part to_char to_date row_number rank dense_rank ntile lag lead first_value last_value json_extract array_agg string_agg group_concat ifnull greatest least random uuid gen_random_uuid".split(/\s+/)),Ct=["SELECT","FROM","WHERE","GROUP BY","ORDER BY","HAVING","LIMIT","OFFSET","UNION ALL","UNION","INSERT INTO","VALUES","UPDATE","SET","DELETE FROM","RETURNING","LEFT JOIN","RIGHT JOIN","INNER JOIN","FULL JOIN","JOIN"];function lt(t){let e=String(t??""),n=[],a=0,l=(i,o)=>{if(!o)return;let u=n[n.length-1];u&&u.type===i?u.value+=o:n.push({type:i,value:o})};for(;a<e.length;){let i=e[a],o=e.slice(a);if(i==="-"&&e[a+1]==="-"){let u=e.indexOf(`
`,a),f=u===-1?e.length:u;l("comment",e.slice(a,f)),a=f;continue}if(i==="/"&&e[a+1]==="*"){let u=e.indexOf("*/",a+2),f=u===-1?e.length:u+2;l("comment",e.slice(a,f)),a=f;continue}if(i==="'"||i==='"'||i==="`"){let u=a+1;for(;u<e.length;){if(e[u]==="\\"){u+=2;continue}if(e[u]===i){if(e[u+1]===i){u+=2;continue}u+=1;break}u+=1}l(i==="'"?"string":"ident",e.slice(a,u)),a=u;continue}if(i==="$"&&/^\$[A-Za-z_]*\$/.test(o)){let u=/^\$[A-Za-z_]*\$/.exec(o)[0],f=e.indexOf(u,a+u.length),E=f===-1?e.length:f+u.length;l("string",e.slice(a,E)),a=E;continue}if(/[0-9]/.test(i)||i==="."&&/[0-9]/.test(e[a+1]??"")){let u=/^[0-9]*\.?[0-9]+(?:[eE][-+]?[0-9]+)?/.exec(o);l("number",u?u[0]:i),a+=u?u[0].length:1;continue}if(/[A-Za-z_@:]/.test(i)){let f=/^[A-Za-z_@:][A-Za-z0-9_$@:]*/.exec(o)[0],E=f.toLowerCase(),q=e[a+f.length];i==="@"||i===":"?l("variable",f):it.has(E)?l("keyword",f):q==="("||dt.has(E)?l("function",f):l("plain",f),a+=f.length;continue}if(/[(),;]/.test(i)){l("punct",i),a+=1;continue}if(/[=<>!+\-*/%|]/.test(i)){let u=/^(?:<>|!=|<=|>=|\|\||::|[-+*/%=<>])/.exec(o);l("operator",u?u[0]:i),a+=u?u[0].length:1;continue}l("ws",i),a+=1}return n}function St(t){let e=String(t??"").trim();if(!e)return"";let n=lt(e),a=[],l="",i=0,o=()=>{let u=l.replace(/\s+/g," ").trim();u&&a.push(u),l=""};for(let u=0;u<n.length;u+=1){let f=n[u];if(f.type==="ws"){l+=" ";continue}if(f.type==="comment"){o(),a.push(f.value.trim());continue}if(f.type==="punct"){f.value==="("&&(i+=1),f.value===")"&&(i=Math.max(0,i-1)),l+=f.value;continue}if(f.type==="keyword"){let E=f.value.toUpperCase(),q=n[u+1],H=n[u+2];if(q&&q.type==="ws"&&H&&H.type==="keyword"){let k=`${E} ${H.value.toUpperCase()}`;Ct.includes(k)&&(E=k,u+=2)}if(i===0&&Ct.includes(E)){o(),l=`${E} `;continue}l+=`${E} `;continue}l+=f.value}return o(),a.length<2?e:a.join(`
  `).replace(/[ \t]+$/gm,"")}function Oe(t,e){let n=String(e??"");return t==="mysql"?"`"+n.replace(/`/g,"``")+"`":t==="sqlserver"?"["+n.replace(/]/g,"]]")+"]":'"'+n.replace(/"/g,'""')+'"'}function ot(t){let e=String(t??"").trim();return e===""?"''":/^-?\d+(\.\d+)?$/.test(e)?e:/^(null|true|false)$/i.test(e)?e.toUpperCase():`'${e.replace(/'/g,"''")}'`}var Et=["=","<>",">",">=","<","<=","LIKE","NOT LIKE","IN","BETWEEN","IS NULL","IS NOT NULL"];function ct(t,e){let n=[];for(let a of e.conditions){if(!a.column)continue;let l=Oe(t,a.column),i=a.op;if(i==="IS NULL"||i==="IS NOT NULL"){n.push(`${l} ${i}`);continue}let o=String(a.value??"");if(o!==""){if(i==="IN"){let u=o.split(",").map(ot).filter(Boolean);if(u.length===0)continue;n.push(`${l} IN (${u.join(", ")})`);continue}if(i==="BETWEEN"){let u=o.split(",").map(ot);if(u.length<2)continue;n.push(`${l} BETWEEN ${u[0]} AND ${u[1]}`);continue}n.push(`${l} ${i} ${ot(o)}`)}}return n.join(` ${e.joiner} `)}function Rt(t,e){let n=document.createElement("div"),a=window.getComputedStyle(t),l=["fontFamily","fontSize","fontWeight","lineHeight","letterSpacing","padding","border","whiteSpace","wordWrap","tabSize"];for(let f of l)n.style[f]=a[f];n.style.position="absolute",n.style.visibility="hidden",n.style.width=`${t.clientWidth}px`,n.style.whiteSpace="pre-wrap",n.style.overflowWrap="break-word",n.textContent=t.value.slice(0,e);let i=document.createElement("span");i.textContent="\u200B",n.appendChild(i),document.body.appendChild(n);let o=i.offsetLeft-t.scrollLeft,u=i.offsetTop-t.scrollTop;return document.body.removeChild(n),{left:Math.max(0,o),top:u}}function ce(t,e){return String(t).replace(/\{(\w+)\}/g,(n,a)=>e&&e[a]!==void 0?String(e[a]):n)}function We(t,e,n=300){if(t==null)return{text:e,isNull:!0,numeric:!1};if(typeof t=="object")try{let l=JSON.stringify(t);return{text:l.length>n?`${l.slice(0,n)}\u2026`:l,isNull:!1,numeric:!1}}catch{return{text:String(t),isNull:!1,numeric:!1}}let a=String(t);return{text:a.length>n?`${a.slice(0,n)}\u2026`:a,isNull:!1,numeric:typeof t=="number"}}function Je(t){if(t==null)return"";let e=typeof t=="object"?JSON.stringify(t):String(t);return/[",\n\r]/.test(e)?`"${e.replace(/"/g,'""')}"`:e}function It(t){return String(t||"table").replace(/[^\w.-]+/g,"_").slice(0,60)}function He(t,e,n){let a=new Blob([n],{type:`${e};charset=utf-8`}),l=URL.createObjectURL(a),i=document.createElement("a");i.href=l,i.download=t,document.body.appendChild(i),i.click(),i.remove(),setTimeout(()=>URL.revokeObjectURL(l),1e3)}function Nn(t,e){return t==null?"NULL":typeof t=="number"?Number.isFinite(t)?String(t):"NULL":typeof t=="boolean"?e==="sqlserver"?t?"1":"0":t?"TRUE":"FALSE":`'${(typeof t=="object"?JSON.stringify(t):String(t)).replace(/'/g,"''")}'`}function Tt(t,e,n,a){let i=[e.database,...t==="postgres"||t==="sqlserver"?[e.schema]:[],e.table].filter(Boolean).map(u=>Oe(t,u)).join("."),o=n.map(u=>Oe(t,u.name)).join(", ");return a.map(u=>`INSERT INTO ${i} (${o}) VALUES (${n.map(f=>Nn(u[f.name],t)).join(", ")});`).join(`
`)}function Mt(t,e){let n=o=>o==null?"":(typeof o=="object"?JSON.stringify(o):String(o)).replace(/\|/g,"\\|").replace(/\r?\n/g," "),a=`| ${t.map(o=>n(o.name)).join(" | ")} |`,l=`| ${t.map(()=>"---").join(" | ")} |`,i=e.map(o=>`| ${t.map(u=>n(o[u.name])).join(" | ")} |`);return[a,l,...i].join(`
`)}function zt(t){let e=String(t??"").replace(/^\uFEFF/,""),n=[],a=[],l="",i=!1,o=0,u=()=>{a.push(l),l=""},f=()=>{u(),(a.length>1||a[0]!=="")&&n.push(a),a=[]};for(;o<e.length;){let k=e[o];if(i){if(k==='"'){if(e[o+1]==='"'){l+='"',o+=2;continue}i=!1,o+=1;continue}l+=k,o+=1;continue}if(k==='"'&&l===""){i=!0,o+=1;continue}if(k===","){u(),o+=1;continue}if(k==="\r"){o+=e[o+1]===`
`?2:1,f();continue}if(k===`
`){o+=1,f();continue}l+=k,o+=1}(l!==""||a.length>0)&&f();let[E=[],...q]=n,H=E.length;return{header:E.map(k=>k.trim()),rows:q.map(k=>{let D=k.slice(0,H);for(;D.length<H;)D.push("");return D})}}function Pt(t){if(!Number.isFinite(t)||t<=0)return"0 B";let e=["B","KB","MB","GB"],n=t,a=0;for(;n>=1024&&a<e.length-1;)n/=1024,a+=1;return`${n.toFixed(a===0?0:1)} ${e[a]}`}function Dt(t){let e=Date.parse(t);if(Number.isNaN(e))return"";let n=Math.max(1,Math.round((Date.now()-e)/1e3));return n<60?`${n}s`:n<3600?`${Math.round(n/60)}m`:n<86400?`${Math.round(n/3600)}h`:`${Math.round(n/86400)}d`}var qt=require("react");var Ue=class extends Error{constructor(n,a){super(n);this.status=a;this.name="ApiError"}},Cn="api/grid",gt=class{constructor(e=Cn){this.path=e}async call(e,n={},a){let l;try{l=await fetch(this.path,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({action:e,...n}),...a?{signal:a}:{}})}catch(u){throw u instanceof DOMException&&u.name==="AbortError"?u:new Ue(u instanceof Error?u.message:String(u),0)}let i=null;try{i=await l.json()}catch{i=null}let o=i&&typeof i=="object"?i:{};if(!l.ok||o.error)throw new Ue(String(o.error??`request failed (${l.status})`),l.status);return o}meta(){return this.call("meta")}listConnections(){return this.call("connections.list")}createConnection(e){return this.call("connections.create",{connection:e})}updateConnection(e,n){return this.call("connections.update",{id:e,patch:n})}deleteConnection(e){return this.call("connections.delete",{id:e})}testConnection(e){return this.call("connections.test",{id:e})}testDraft(e,n){return this.call("connections.test",{connection:e,...n?{id:n}:{}})}connect(e){return this.call("connections.connect",{id:e})}disconnect(e){return this.call("connections.disconnect",{id:e})}sessions(){return this.call("connections.sessions")}databases(e){return this.call("databases",{connectionId:e})}relations(e,n,a){return this.call("tables",{connectionId:e,database:n,schema:a})}describe(e,n,a,l){return this.call("columns",{connectionId:e,database:n,schema:a,table:l})}rows(e,n){return this.call("rows",e,n)}updateRow(e){return this.call("rows.update",e)}insertRow(e){return this.call("rows.insert",e)}insertRows(e){return this.call("rows.insertMany",e)}deleteRow(e){return this.call("rows.delete",e)}exportRows(e){return this.call("export",e)}sql(e){return this.call("sql",e)}sqlCancel(e){return this.call("sql.cancel",{connectionId:e})}routines(e,n,a){return this.call("routines",{connectionId:e,database:n,schema:a})}accounts(e){return this.call("accounts",{connectionId:e})}listQueries(){return this.call("queries.list")}saveQuery(e){return this.call("queries.save",e)}deleteQuery(e){return this.call("queries.delete",{id:e})}bindProject(e){return this.call("projects.bind",e)}unbindProject(e){return this.call("projects.unbind",{workspaceId:e})}redisDatabases(e){return this.call("redis.databases",{connectionId:e})}redisScan(e){return this.call("redis.scan",e)}redisKey(e,n,a){return this.call("redis.key",{connectionId:e,key:n,database:a})}redisCommand(e,n){return this.call("redis.command",{connectionId:e,command:n})}redisDelete(e,n,a){return this.call("redis.delete",{connectionId:e,key:n,database:a})}engines(){return this.call("meta")}},F=new gt;var Pe=class{constructor(e){this.listeners=new Set;this.getSnapshot=()=>this.state;this.subscribe=e=>(this.listeners.add(e),()=>{this.listeners.delete(e)});this.state=e}setState(e){this.state=e;for(let n of this.listeners)n()}patch(e){this.setState({...this.state,...e})}};function ue(t){return(0,qt.useSyncExternalStore)(t.subscribe,t.getSnapshot,t.getSnapshot)}var ut=class extends Pe{constructor(){super({meta:null,error:""})}async load(){try{this.patch({meta:await F.meta(),error:""})}catch(e){this.patch({error:e instanceof Error?e.message:String(e)})}}get current(){return this.state.meta}engines(){return this.state.meta?.engines??[]}get allowWrites(){return this.state.meta?.allowWrites===!0}},$t={status:"closed",version:"",error:"",databases:[]},mt=class extends Pe{constructor(){super({items:[],activeId:"",loading:!1,error:"",sessions:{},testing:{}})}async load(){this.patch({loading:!0});try{let{connections:e}=await F.listConnections(),n=this.state.items.some(a=>a.id===this.state.activeId)?this.state.activeId:e[0]?.id??"";this.patch({items:e,activeId:n,loading:!1,error:""})}catch(e){this.patch({loading:!1,error:e instanceof Error?e.message:String(e)})}}select(e){this.patch({activeId:e})}get active(){return this.state.items.find(e=>e.id===this.state.activeId)??null}session(e){return this.state.sessions[e]??$t}setSession(e,n){let a=this.session(e);this.patch({sessions:{...this.state.sessions,[e]:{...a,...n}}})}async create(e){let n=await F.createConnection(e);return await this.load(),this.select(n.connection.id),n.probe}async update(e,n){await F.updateConnection(e,n),this.setSession(e,{status:"closed",version:"",databases:[]}),await this.load()}async remove(e){await F.deleteConnection(e);let n={...this.state.sessions};delete n[e],this.patch({sessions:n}),await this.load()}async test(e){this.patch({testing:{...this.state.testing,[e]:!0}});try{return await F.testConnection(e)}finally{this.patch({testing:{...this.state.testing,[e]:!1}})}}async connect(e){if(this.session(e).status!=="open"){this.setSession(e,{status:"opening",error:""});try{let n=await F.connect(e),{databases:a}=await F.databases(e);this.setSession(e,{status:"open",version:n.serverVersion,databases:a,error:""})}catch(n){this.setSession(e,{status:"error",error:n instanceof Error?n.message:String(n)})}}}async disconnect(e){await F.disconnect(e).catch(()=>{}),this.setSession(e,{...$t})}async reloadDatabases(e){if(this.session(e).status!=="open")return this.connect(e);try{let{databases:n}=await F.databases(e);this.setSession(e,{databases:n})}catch(n){this.setSession(e,{status:"error",error:n instanceof Error?n.message:String(n)})}}};function Lt(t,e,n=""){return`${t}|${e}|${n}`}var pt=class extends Pe{constructor(){super({relations:{},routines:{},accounts:{},loading:{},errors:{}})}relationsOf(e){return this.state.relations[e]??[]}routinesOf(e){return this.state.routines[e]??[]}accountsOf(e){return this.state.accounts[e]??[]}isLoading(e){return this.state.loading[e]===!0}errorOf(e){return this.state.errors[e]??""}async run(e,n,a){this.patch({loading:{...this.state.loading,[e]:!0}});try{let l=await n();this.setState({...this.state,...a(l),loading:{...this.state.loading,[e]:!1},errors:{...this.state.errors,[e]:""}})}catch(l){this.setState({...this.state,loading:{...this.state.loading,[e]:!1},errors:{...this.state.errors,[e]:l instanceof Error?l.message:String(l)}})}}async loadRelations(e,n,a="",l=!1){let i=Lt(e,n,a);!l&&this.state.relations[i]||await this.run(i,()=>F.relations(e,n,a),({tables:o})=>({relations:{...this.state.relations,[i]:o}}))}async loadRoutines(e,n,a="",l=!1){let i=Lt(e,n,a);!l&&this.state.routines[i]||await this.run(i,()=>F.routines(e,n,a),({routines:o})=>({routines:{...this.state.routines,[i]:o}}))}async loadAccounts(e,n=!1){!n&&this.state.accounts[e]||await this.run(e,()=>F.accounts(e),({accounts:a})=>({accounts:{...this.state.accounts,[e]:a}}))}invalidate(e){let n={...this.state.relations};delete n[e],this.patch({relations:n})}},vt=class extends Pe{constructor(){super({tabs:[],activeId:""})}open(e){let n=this.state.tabs.some(a=>a.id===e.id);this.setState({tabs:n?this.state.tabs:this.state.tabs.concat(e),activeId:e.id})}activate(e){this.patch({activeId:e})}close(e){let n=this.state.tabs.findIndex(i=>i.id===e),a=this.state.tabs.filter(i=>i.id!==e),l=a[Math.max(0,n-1)];this.setState({tabs:a,activeId:this.state.activeId===e?l?.id??"":this.state.activeId})}closeConnection(e){let n=this.state.tabs.filter(l=>l.connectionId!==e),a=n.some(l=>l.id===this.state.activeId);this.setState({tabs:n,activeId:a?this.state.activeId:n[n.length-1]?.id??""})}get active(){return this.state.tabs.find(e=>e.id===this.state.activeId)??null}},ht=class extends Pe{constructor(){super({items:[],loading:!1,error:""})}async load(){this.patch({loading:!0});try{let{queries:e}=await F.listQueries();this.patch({items:e,loading:!1,error:""})}catch(e){this.patch({loading:!1,error:e instanceof Error?e.message:String(e)})}}async save(e){let{query:n}=await F.saveQuery(e);return await this.load(),n}async remove(e){await F.deleteQuery(e),await this.load()}},_e=class{constructor(){this.meta=new ut;this.connections=new mt;this.catalog=new pt;this.tabs=new vt;this.queries=new ht}async bootstrap(){await Promise.all([this.meta.load(),this.connections.load(),this.queries.load()])}bindings(){return this.meta.current?.bindings??[]}bindingFor(e){return this.bindings().find(n=>n.workspaceId===e)??null}};var Be=require("react"),ft=require("react-dom"),j=require("react/jsx-runtime"),At={plus:"M12 5v14M5 12h14",refresh:"M20 11a8 8 0 1 0-2.3 5.7M20 5v6h-6",play:"M8 5v14l11-7z",trash:"M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3",pencil:"M4 20h4L20 8l-4-4L4 16z",chevron:"M9 6l6 6-6 6",chevronLeft:"M15 6l-6 6 6 6",database:"M12 3c4 0 7 1.3 7 3s-3 3-7 3-7-1.3-7-3 3-3 7-3zM5 6v12c0 1.7 3 3 7 3s7-1.3 7-3V6",table:"M4 5h16v14H4zM4 10h16M10 10v9",view:"M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",key:"M14 4a6 6 0 1 0-5.2 8.9L4 18v2h3v-3h3v-3h2.2A6 6 0 0 0 14 4z",search:"M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM16 16l4 4",download:"M12 4v10M8 11l4 4 4-4M5 19h14",x:"M6 6l12 12M18 6L6 18",check:"M5 13l4 4L19 7",plug:"M9 3v6M15 3v6M6 9h12v3a6 6 0 0 1-12 0zM12 18v3",unplug:"M9 3v6M15 3v6M6 9h12v3a6 6 0 0 1-6 6M12 18v3M4 4l16 16",filter:"M4 5h16l-6 7v6l-4 2v-8z",folder:"M3 6h6l2 2h10v11H3z",copy:"M9 9h10v10H9zM5 15V5h10",alert:"M12 4l9 16H3zM12 10v4M12 17h.01",columns:"M4 5h16M4 12h16M4 19h16",wand:"M4 20l10-10M14 5l1.5 1.5M18 3l1 2 2 .5-2 1.5.5 2-2-1-2 1 .5-2-2-1.5 2-.5z",history:"M12 8v5l3 2M4 12a8 8 0 1 0 3-6.2M4 4v4h4",function:"M9 4c-2 0-3 1-3 3v10c0 2-1 3-3 3M6 11h7M15 14l5 6M20 14l-5 6",user:"M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM4 21a8 8 0 0 1 16 0",bookmark:"M6 4h12v17l-6-4-6 4z",archive:"M4 4h16v4H4zM5 8h14v12H5zM9 13h6",link:"M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1",info:"M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 11v6M12 8h.01"};function M({name:t,size:e=14}){return(0,j.jsx)("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:1.7,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0,focusable:"false",children:(0,j.jsx)("path",{d:At[t]??At.table})})}function A(t){let e=["dg-btn"];return t.variant&&t.variant!=="default"&&e.push(`dg-btn-${t.variant}`),t.size==="sm"&&e.push("dg-btn-sm"),t.active&&e.push("dg-btn-active"),(0,j.jsx)("button",{type:t.type??"button",className:e.join(" "),onClick:t.onClick,disabled:t.disabled,title:t.title,"aria-label":t.title,"aria-pressed":t.active,children:t.children})}function te(t){return(0,j.jsx)("button",{type:"button",className:`dg-iconbtn${t.active?" dg-btn-active":""}`,title:t.title,"aria-label":t.title,onClick:t.onClick,disabled:t.disabled,children:(0,j.jsx)(M,{name:t.icon,size:t.size??13})})}function oe(t){return(0,j.jsxs)("label",{className:`dg-field${t.wide?" dg-field-wide":""}`,children:[(0,j.jsx)("span",{className:"dg-field-label",children:t.label}),t.children,t.hint?(0,j.jsx)("span",{className:"dg-field-hint",children:t.hint}):null]})}function ne(t){let{className:e,...n}=t;return(0,j.jsx)("input",{...n,className:`dg-input${e?` ${e}`:""}`})}function Ot(t){let{className:e,...n}=t;return(0,j.jsx)("textarea",{...n,className:`dg-input dg-textarea${e?` ${e}`:""}`})}function xe(t){return(0,j.jsx)("select",{...t,className:`dg-input dg-select${t.className?` ${t.className}`:""}`})}function be({label:t}){return(0,j.jsxs)("span",{className:"dg-spinner-row",children:[(0,j.jsx)("span",{className:"dg-spinner","aria-hidden":!0}),t?(0,j.jsx)("span",{children:t}):null]})}function me({title:t,hint:e,children:n}){return(0,j.jsxs)("div",{className:"dg-empty",children:[(0,j.jsx)("div",{className:"dg-empty-title",children:t}),e?(0,j.jsx)("div",{className:"dg-empty-hint",children:e}):null,n]})}function ae(t){return t.children?(0,j.jsxs)("div",{className:`dg-banner dg-banner-${t.tone??"info"}`,role:"status",children:[(0,j.jsx)(M,{name:t.tone==="error"?"alert":"check",size:12}),(0,j.jsx)("span",{className:"dg-banner-text",children:t.children}),t.onClose?(0,j.jsx)("button",{type:"button",className:"dg-iconbtn dg-iconbtn-tiny",onClick:t.onClose,"aria-label":"dismiss",children:(0,j.jsx)(M,{name:"x",size:10})}):null]}):null}function Bt(t){return(0,j.jsx)("div",{className:"dg-seg",children:t.options.map(e=>(0,j.jsx)("button",{type:"button",className:e.value===t.value?"dg-seg-on":"",onClick:()=>t.onChange(e.value),children:e.label},e.value))})}function Kt({status:t}){return(0,j.jsx)("span",{className:`dg-dot${t==="open"?" dg-dot-open":t==="error"?" dg-dot-error":t==="opening"?" dg-dot-busy":""}`})}function Ee(t){let e=(0,Be.useRef)(null);return(0,Be.useEffect)(()=>{let n=l=>{l.key==="Escape"&&!t.busy&&(l.stopPropagation(),t.onClose())};document.addEventListener("keydown",n);let a=setTimeout(()=>e.current?.focus(),0);return()=>{document.removeEventListener("keydown",n),clearTimeout(a)}},[t.busy,t.onClose]),(0,ft.createPortal)((0,j.jsx)("div",{className:"dg-backdrop",onMouseDown:n=>{n.target===n.currentTarget&&!t.busy&&t.onClose()},children:(0,j.jsxs)("div",{className:"dg-modal",style:{width:`${t.width??520}px`},role:"dialog","aria-modal":"true","aria-label":t.title,children:[(0,j.jsxs)("div",{className:"dg-modal-head",children:[(0,j.jsx)("span",{className:"dg-modal-title",children:t.title}),(0,j.jsx)("button",{ref:e,type:"button",className:"dg-iconbtn",onClick:()=>!t.busy&&t.onClose(),"aria-label":"close",children:(0,j.jsx)(M,{name:"x",size:13})})]}),(0,j.jsx)("div",{className:"dg-modal-body",children:t.children}),t.footer?(0,j.jsx)("div",{className:"dg-modal-foot",children:t.footer}):null]})}),document.body)}function Ke(t){let e=(0,Be.useRef)(null);(0,Be.useEffect)(()=>{let a=i=>{e.current&&!e.current.contains(i.target)&&t.onClose()},l=i=>{i.key==="Escape"&&t.onClose()};return document.addEventListener("mousedown",a),document.addEventListener("keydown",l),()=>{document.removeEventListener("mousedown",a),document.removeEventListener("keydown",l)}},[t.onClose]);let n=t.items.filter(Boolean);return(0,ft.createPortal)((0,j.jsx)("div",{ref:e,className:"dg-ctxmenu",role:"menu",style:{left:`${Math.min(t.x,window.innerWidth-200)}px`,top:`${Math.min(t.y,Math.max(8,window.innerHeight-40-n.length*26))}px`},children:n.map((a,l)=>a.separator?(0,j.jsx)("div",{className:"dg-ctxsep"},`sep-${l}`):(0,j.jsxs)("button",{type:"button",role:"menuitem",className:`dg-ctxitem${a.danger?" dg-ctxitem-danger":""}`,disabled:a.disabled,onClick:()=>{t.onClose(),a.disabled||a.onClick?.()},children:[a.icon?(0,j.jsx)(M,{name:a.icon,size:12}):null,a.label,a.hint?(0,j.jsx)("span",{className:"dg-ctxhint",children:a.hint}):null]},`${a.label}-${l}`))}),document.body)}function Ft(t){return(0,j.jsx)("div",{className:"dg-split",role:"separator","aria-orientation":"vertical",onMouseDown:n=>{n.preventDefault();let a=n.clientX,l=t.width;t.onDragging?.(!0);let i=u=>{t.setWidth(Math.max(t.min,Math.min(t.max,l+u.clientX-a)))},o=()=>{t.onDragging?.(!1),window.removeEventListener("mousemove",i),window.removeEventListener("mouseup",o)};window.addEventListener("mousemove",i),window.addEventListener("mouseup",o)}})}var jt=`/* Grid panel styles.
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
  padding: var(--dg-sp-3) var(--dg-sp-5);
  padding-left: max(var(--dg-sp-5), var(--dsh-frame-leading-clearance, 12px));
  min-height: 44px;
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
.dg-brand { display: flex; align-items: center; gap: var(--dg-sp-3); font-weight: 600; font-size: var(--dg-fs-md); white-space: nowrap; margin-right: var(--dg-sp-2); }
.dg-brand svg { color: var(--dg-accent); }

/* buttons ------------------------------------------------------------------ */
.dg-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: var(--dg-sp-2);
  height: var(--dg-ctl); padding: 0 var(--dg-sp-4);
  border: 1px solid var(--dg-line); border-radius: var(--dg-r-sm);
  background: var(--dg-bg);
  color: var(--dg-text);
  font-size: var(--dg-fs-sm); cursor: pointer; white-space: nowrap;
  transition: background var(--dg-dur-1) var(--dg-ease), border-color var(--dg-dur-1) var(--dg-ease),
    color var(--dg-dur-1) var(--dg-ease);
}
.dg-btn:hover:not(:disabled) { background: var(--dg-hover); }
.dg-btn:active:not(:disabled) { background: var(--dg-pressed); }
.dg-btn:disabled { opacity: 0.42; cursor: default; }
/* The host's solid call-to-action: black on white in light mode, near-white on
   dark in dark mode. */
.dg-btn-primary {
  background: var(--dsw-alias-button-primary-fill, var(--dg-text));
  border-color: var(--dsw-alias-button-primary-fill, var(--dg-text));
  color: var(--dsw-alias-label-primary-inverted, var(--dg-bg));
  font-weight: 500;
}
.dg-btn-primary:hover:not(:disabled) { background: var(--dsw-alias-button-primary-hover, var(--dg-text-2)); border-color: var(--dsw-alias-button-primary-hover, var(--dg-text-2)); }
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
  display: flex; align-items: center; gap: var(--dg-sp-1);
  height: var(--dg-ctl); padding: 0 var(--dg-sp-2);
  border: 1px solid var(--dg-line); border-radius: var(--dg-r-xs);
  background: var(--dg-bg); color: var(--dg-text-3); flex: 1; min-width: 0;
  transition: border-color var(--dg-dur-1) var(--dg-ease);
}
.dg-search:focus-within { border-color: var(--dg-accent); }
.dg-search input {
  border: 0; outline: none; background: transparent; color: var(--dg-text);
  font: inherit; font-size: var(--dg-fs-xs); flex: 1; min-width: 0; height: 100%;
}
.dg-search input::placeholder { color: var(--dg-text-3); }

/* tabs --------------------------------------------------------------------- */
.dg-tabs {
  display: flex; align-items: stretch; gap: 0;
  border-bottom: 1px solid var(--dg-line);
  background: var(--dg-surface);
  flex: none; overflow-x: auto; scrollbar-width: none;
}
.dg-tabs::-webkit-scrollbar { display: none; }
.dg-tab {
  display: flex; align-items: center; gap: var(--dg-sp-2);
  height: 32px; padding: 0 var(--dg-sp-2) 0 var(--dg-sp-4);
  border: 0; border-right: 1px solid var(--dg-line-soft);
  background: transparent; color: var(--dg-text-2);
  font-size: var(--dg-fs-sm); cursor: pointer; white-space: nowrap;
  max-width: 220px; position: relative;
  transition: background var(--dg-dur-1) var(--dg-ease), color var(--dg-dur-1) var(--dg-ease);
}
.dg-tab:hover { background: var(--dg-hover); color: var(--dg-text); }
/* The active tab is cut out of the tab strip, so it reads as continuous with
   the content below rather than as one more raised chip. */
.dg-tab-active { background: var(--dg-bg); color: var(--dg-text); }
.dg-tab-active::after { content: ''; position: absolute; left: 0; right: 0; top: 0; height: 2px; background: var(--dg-accent); }
.dg-tab-label { overflow: hidden; text-overflow: ellipsis; }
.dg-tab-close { display: inline-flex; align-items: center; justify-content: center; width: 24px; height: 24px; margin-right: -2px; border: 0; border-radius: var(--dg-r-xs); background: transparent; color: var(--dg-text-2); cursor: pointer; flex: none; }
.dg-tab-close:hover, .dg-tab-close:focus-visible { background: var(--dg-pressed); color: var(--dg-text); }

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
.dg-backdrop { position: fixed; inset: 0; z-index: 60; display: flex; align-items: center; justify-content: center; background: var(--dg-mask); padding: var(--dg-sp-5); }
.dg-modal {
  display: flex; flex-direction: column; max-height: 88vh;
  /* The dialog width is set by the caller; the cap keeps it usable when the
     host panel is narrower than that width. */
  width: 100%; max-width: 100%;
  border-radius: var(--dg-r-lg);
  background: var(--dg-bg);
  border: 1px solid var(--dg-line);
  box-shadow: var(--dg-elev-2);
  overflow: hidden;
}
.dg-modal-head { display: flex; align-items: center; gap: var(--dg-sp-3); padding: var(--dg-sp-4) var(--dg-sp-5); border-bottom: 1px solid var(--dg-line); flex: none; }
.dg-modal-title { flex: 1; font-weight: 600; font-size: var(--dg-fs-md); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.dg-modal-body { padding: var(--dg-sp-5); overflow: auto; min-height: 0; display: flex; flex-direction: column; gap: var(--dg-sp-4); }
.dg-modal-foot { display: flex; align-items: center; justify-content: flex-end; gap: var(--dg-sp-2); padding: var(--dg-sp-4) var(--dg-sp-5); border-top: 1px solid var(--dg-line); flex: none; flex-wrap: wrap; }
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

.dg-empty { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: var(--dg-sp-3); padding: var(--dg-sp-6); text-align: center; color: var(--dg-text-2); }
.dg-empty-title { font-size: var(--dg-fs-md); font-weight: 600; color: var(--dg-text); }
.dg-empty-hint { font-size: var(--dg-fs-sm); max-width: 420px; line-height: var(--dg-lh-body); }

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
  border: 1px solid var(--dg-line); border-radius: var(--dg-r-md);
  padding: var(--dg-sp-4);
  display: flex; flex-direction: column; gap: var(--dg-sp-2);
  background: var(--dg-surface);
}
.dg-ws-head { display: flex; align-items: center; gap: var(--dg-sp-3); min-width: 0; }
.dg-ws-title { font-weight: 600; font-size: var(--dg-fs-md); white-space: nowrap; }
.dg-ws-path { color: var(--dg-text-2); font-size: var(--dg-fs-xs); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; direction: rtl; text-align: left; min-width: 0; }
/* Two fields side by side, with the actions on their own row: the old
   \`1fr 1fr auto\` grid squeezed both fields to nothing in a 660px dialog. */
.dg-ws-form { display: grid; grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr); gap: var(--dg-sp-3) var(--dg-sp-4); align-items: end; }
.dg-ws-actions { grid-column: 1 / -1; display: flex; gap: var(--dg-sp-2); justify-content: flex-end; }

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
`;var De=require("react");var C=require("react/jsx-runtime"),En={mysql:{color:"#e48e00",glyph:"cylinder"},postgres:{color:"#336791",glyph:"cylinder"},sqlite:{color:"#0f80cc",glyph:"file"},sqlserver:{color:"#cc2927",glyph:"cylinder"},redis:{color:"#dc382d",glyph:"layers"}},Rn={mysql:["TCP",":3306","mysql2"],postgres:["TCP",":5432","pg"],sqlite:["file","built-in"],sqlserver:["TDS",":1433","mssql"],redis:["TCP",":6379","ioredis"]},In=[{value:"none",color:"var(--dsw-alias-border-l2)"},{value:"green",color:"var(--dsw-alias-state-success-primary)"},{value:"yellow",color:"var(--dsw-alias-state-warn-primary)"},{value:"red",color:"var(--dsw-alias-state-error-primary)"}];function Tn({engine:t,size:e=26}){let n=En[t]??{color:"#6b7280",glyph:"cylinder"},a=n.glyph==="layers"?"M12 4l7 3.5-7 3.5-7-3.5zM5 12l7 3.5 7-3.5M5 16.5l7 3.5 7-3.5":n.glyph==="file"?"M7 3h7l4 4v14H7zM10 12h5M10 16h5":"M12 4c3.9 0 6 1.1 6 2.5S15.9 9 12 9 6 7.9 6 6.5 8.1 4 12 4zM6 6.5v11c0 1.4 2.1 2.5 6 2.5s6-1.1 6-2.5v-11";return(0,C.jsx)("span",{className:"dg-logo",style:{width:e,height:e,background:n.color},"aria-hidden":!0,children:(0,C.jsx)("svg",{width:e*.68,height:e*.68,viewBox:"0 0 24 24",fill:"none",stroke:"#fff",strokeWidth:1.8,strokeLinecap:"round",strokeLinejoin:"round",children:(0,C.jsx)("path",{d:a})})})}function Vt(t){let{t:e,engines:n}=t,a=t.initial,[l,i]=(0,De.useState)(a?.engine??"sqlite"),[o,u]=(0,De.useState)(()=>({name:a?.name??"",group:a?.group??"",host:a?.host||"127.0.0.1",port:a?.port?String(a.port):"",user:a?.user??"",password:"",database:a?.database??"",file:a?.file??"",redisDb:String(a?.redisDb??0),sslMode:a?.sslMode??"disable",color:a?.color??"none"})),[f,E]=(0,De.useState)(null),[q,H]=(0,De.useState)(!1),[k,D]=(0,De.useState)(!1),[Q,P]=(0,De.useState)(""),B=n.find(p=>p.id===l),$=q||k,N=p=>L=>u(W=>({...W,[p]:L.target.value})),K=()=>{let p={name:o.name.trim(),engine:l,group:o.group.trim(),host:o.host.trim(),port:Number.parseInt(o.port,10)||B?.defaultPort||0,user:o.user.trim(),database:o.database.trim(),file:o.file.trim(),redisDb:Number.parseInt(o.redisDb,10)||0,sslMode:o.sslMode,color:o.color};return(o.password!==""||!a?.hasPassword)&&(p.password=o.password),p},w=async()=>{H(!0),E(null),P("");try{let p=await F.testDraft(K(),a?.id);E({ok:!0,text:ce(e("testOk"),{version:p.serverVersion??"",ms:p.latencyMs??0})})}catch(p){E({ok:!1,text:ce(e("testFailed"),{error:p instanceof Error?p.message:String(p)})})}finally{H(!1)}},R=async()=>{D(!0),P("");try{await t.onSave(K())}catch(p){P(p instanceof Error?p.message:String(p)),D(!1)}},J=B?.kind==="file"?o.file.trim():`${o.host||"\u2026"}:${o.port||B?.defaultPort||"\u2026"}`;return(0,C.jsxs)(Ee,{title:e(a?"edit":"newConnection"),onClose:t.onClose,busy:$,width:620,footer:(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)("span",{className:"dg-muted dg-hint",style:{marginRight:"auto",maxWidth:"54%"},children:f?.text??""}),(0,C.jsxs)(A,{onClick:()=>{w()},disabled:$,children:[q?(0,C.jsx)(be,{}):null,e("test")]}),(0,C.jsx)(A,{onClick:t.onClose,disabled:$,children:e("cancel")}),(0,C.jsxs)(A,{variant:"primary",onClick:()=>{R()},disabled:$,children:[k?(0,C.jsx)(be,{}):null,e("save")]})]}),children:[(0,C.jsx)("div",{className:"dg-engines",children:n.map(p=>(0,C.jsxs)("button",{type:"button",className:`dg-engine${p.id===l?" dg-engine-active":""}`,onClick:()=>{i(p.id),u(L=>({...L,port:String(p.defaultPort||""),sslMode:"disable"})),E(null)},children:[(0,C.jsxs)("span",{className:"dg-engine-head",children:[(0,C.jsx)(Tn,{engine:p.id,size:24}),(0,C.jsx)("span",{className:"dg-engine-name",children:p.label})]}),(0,C.jsx)("span",{className:"dg-tags",children:(Rn[p.id]??[]).map(L=>(0,C.jsx)("span",{className:"dg-tag",children:L},L))})]},p.id))}),(0,C.jsxs)("div",{className:"dg-tags dg-summary",children:[(0,C.jsx)("span",{className:"dg-tag dg-tag-strong",children:B?.label??l}),J?(0,C.jsx)("span",{className:"dg-tag",children:J}):null,o.database?(0,C.jsx)("span",{className:"dg-tag",children:o.database}):null,o.group?(0,C.jsx)("span",{className:"dg-tag",children:o.group}):null,o.sslMode!=="disable"?(0,C.jsx)("span",{className:"dg-tag",children:"TLS"}):null]}),(0,C.jsxs)("section",{className:"dg-form-section",children:[(0,C.jsx)("div",{className:"dg-section-title",children:e("identity")}),(0,C.jsxs)("div",{className:"dg-form",children:[(0,C.jsx)(oe,{label:e("name"),children:(0,C.jsx)(ne,{value:o.name,onChange:N("name"),placeholder:B?.label})}),(0,C.jsx)(oe,{label:e("group"),children:(0,C.jsx)(ne,{value:o.group,onChange:N("group"),placeholder:"dev"})})]}),(0,C.jsxs)("div",{className:"dg-colors",children:[(0,C.jsx)("span",{className:"dg-field-label",children:e("color")}),In.map(p=>(0,C.jsx)("button",{type:"button",className:`dg-swatch${p.value==="none"?" dg-swatch-none":""}${o.color===p.value?" dg-swatch-on":""}`,style:{background:p.color},title:p.value,"aria-label":p.value,"aria-pressed":o.color===p.value,onClick:()=>u(L=>({...L,color:p.value})),children:o.color===p.value?(0,C.jsx)(M,{name:"check",size:10}):null},p.value))]})]}),(0,C.jsxs)("section",{className:"dg-form-section",children:[B?.kind==="file"?null:(0,C.jsx)("div",{className:"dg-section-title",children:e("server")}),B?.kind==="file"?(0,C.jsx)("div",{className:"dg-form",children:(0,C.jsx)(oe,{label:e("file"),wide:!0,hint:"e.g. D:\\\\data\\\\app.db",children:(0,C.jsx)(ne,{value:o.file,onChange:N("file"),placeholder:"C:/data/app.db"})})}):(0,C.jsxs)("div",{className:"dg-form",children:[(0,C.jsx)(oe,{label:e("host"),children:(0,C.jsx)(ne,{value:o.host,onChange:N("host")})}),(0,C.jsx)(oe,{label:e("port"),children:(0,C.jsx)(ne,{value:o.port,onChange:N("port"),placeholder:String(B?.defaultPort??"")})}),(0,C.jsx)(oe,{label:e("user"),children:(0,C.jsx)(ne,{value:o.user,onChange:N("user")})}),(0,C.jsx)(oe,{label:e("password"),hint:a?.hasPassword?e("passwordKeep"):void 0,children:(0,C.jsx)(ne,{type:"password",value:o.password,onChange:N("password"),autoComplete:"new-password"})}),l==="redis"?(0,C.jsx)(oe,{label:e("redisDb"),children:(0,C.jsx)(ne,{value:o.redisDb,onChange:N("redisDb"),inputMode:"numeric"})}):(0,C.jsx)(oe,{label:e("database"),children:(0,C.jsx)(ne,{value:o.database,onChange:N("database"),placeholder:"optional"})}),(0,C.jsx)(oe,{label:"TLS / SSL",children:(0,C.jsxs)(xe,{value:o.sslMode,onChange:p=>u(L=>({...L,sslMode:p.target.value})),children:[(0,C.jsx)("option",{value:"disable",children:e("sslDisable")}),(0,C.jsx)("option",{value:"require",children:e("sslRequire")}),(0,C.jsx)("option",{value:"verify-ca",children:e("sslVerifyCa")}),(0,C.jsx)("option",{value:"verify-full",children:e("sslVerifyFull")})]})})]})]}),Q?(0,C.jsx)(ae,{tone:"error",onClose:()=>P(""),children:Q}):null]})}var Xe=require("react");var G=require("react/jsx-runtime");function Ht(t){let{t:e,store:n}=t,a=ue(n.meta),l=ue(n.connections),[i,o]=(0,Xe.useState)({}),[u,f]=(0,Xe.useState)(""),[E,q]=(0,Xe.useState)(""),H=a.meta?.workspaces??[],k=a.meta?.bindings??[],D=N=>k.find(K=>K.workspaceId===N),Q=N=>{let K=D(N);return i[N]??{connectionId:K?.connectionId??"",database:K?.database??""}},P=(N,K)=>o(w=>({...w,[N]:{...Q(N),...K}})),B=async(N,K)=>{let w=Q(N);if(!w.connectionId)return q(e("selectConnection"));f(N),q("");try{await F.bindProject({workspaceId:N,workspacePath:K,connectionId:w.connectionId,database:w.database}),await n.meta.load(),t.notify(e("projectBound").replace("{name}",w.connectionId).replace("{database}",w.database),"success")}catch(R){q(R instanceof Error?R.message:String(R))}finally{f("")}},$=async N=>{f(N);try{await F.unbindProject(N),await n.meta.load()}catch(K){q(K instanceof Error?K.message:String(K))}finally{f("")}};return(0,G.jsxs)(Ee,{title:e("workspaces"),onClose:t.onClose,width:660,footer:(0,G.jsx)(A,{onClick:t.onClose,children:e("close")}),children:[(0,G.jsx)(ae,{children:e("agentHint")}),E?(0,G.jsx)(ae,{tone:"error",onClose:()=>q(""),children:E}):null,H.length===0?(0,G.jsx)(me,{title:e("noWorkspaces")}):(0,G.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:8,maxHeight:"54vh",overflow:"auto"},children:H.map(N=>{let K=D(N.id),w=Q(N.id);return(0,G.jsxs)("div",{className:"dg-ws-row",children:[(0,G.jsxs)("div",{className:"dg-ws-head",children:[(0,G.jsx)(M,{name:"folder",size:12}),(0,G.jsx)("span",{className:"dg-ws-title",children:N.title}),(0,G.jsx)("span",{className:"dg-ws-path",title:N.path,children:N.path})]}),K?(0,G.jsxs)("div",{className:"dg-tags",children:[(0,G.jsx)("span",{className:"dg-tag dg-tag-strong",children:K.connectionName||K.connectionId}),K.database?(0,G.jsx)("span",{className:"dg-tag",children:K.database}):null,(0,G.jsx)("span",{className:"dg-tag",children:e("readOnlyForAgent")})]}):(0,G.jsx)("div",{className:"dg-muted dg-hint",children:e("projectUnbound")}),(0,G.jsxs)("div",{className:"dg-ws-form",children:[(0,G.jsx)(oe,{label:e("connections"),children:(0,G.jsxs)(xe,{value:w.connectionId,onChange:R=>P(N.id,{connectionId:R.target.value}),children:[(0,G.jsx)("option",{value:"",children:"\u2014"}),l.items.map(R=>(0,G.jsxs)("option",{value:R.id,children:[R.name," \xB7 ",R.engine]},R.id))]})}),(0,G.jsx)(oe,{label:e("database"),children:(0,G.jsx)(ne,{value:w.database,placeholder:"optional",onChange:R=>P(N.id,{database:R.target.value})})}),(0,G.jsxs)("div",{className:"dg-ws-actions",children:[(0,G.jsx)(A,{size:"sm",variant:"primary",disabled:u===N.id||!w.connectionId,onClick:()=>{B(N.id,N.path)},children:e("bindProject")}),K?(0,G.jsx)(A,{size:"sm",variant:"ghost",disabled:u===N.id,onClick:()=>{$(N.id)},children:e("unbindProject")}):null]})]})]},N.id)})})]})}var ke=require("react");var r=require("react/jsx-runtime");function Qt(t){let{t:e,store:n}=t,a=ue(n.catalog),l=`${t.connectionId}|${t.database}|${t.schema}`,[i,o]=(0,ke.useState)(""),[u,f]=(0,ke.useState)({column:"name",dir:"asc"});(0,ke.useEffect)(()=>{n.catalog.loadRelations(t.connectionId,t.database,t.schema)},[t.connectionId,t.database,t.schema,n]);let E=(0,ke.useMemo)(()=>{let D=i.trim().toLowerCase();return(a.relations[l]??[]).filter(P=>P.kind===t.kind).filter(P=>D?P.name.toLowerCase().includes(D):!0).sort((P,B)=>{let $=u.dir==="desc"?-1:1;return u.column==="rows"?((P.rows??0)-(B.rows??0))*$:u.column==="comment"?(P.comment||"").localeCompare(B.comment||"")*$:P.name.localeCompare(B.name)*$})},[a.relations,l,i,t.kind,u]),q=a.loading[l]===!0,H=a.errors[l]??"",k=(D,Q,P)=>(0,r.jsxs)("th",{className:P,onClick:()=>f(B=>B.column===D?{column:D,dir:B.dir==="asc"?"desc":"asc"}:{column:D,dir:"asc"}),children:[Q,u.column===D?(0,r.jsx)("span",{className:"dg-sortmark",children:u.dir==="desc"?"\u25BC":"\u25B2"}):null]});return(0,r.jsxs)("div",{className:"dg-content",children:[(0,r.jsxs)("div",{className:"dg-subbar",children:[(0,r.jsx)(M,{name:t.kind==="view"?"view":"table",size:12}),(0,r.jsx)("span",{children:t.kind==="view"?e("views"):e("tables")}),(0,r.jsx)("span",{className:"dg-chip",children:E.length}),(0,r.jsx)("div",{className:"dg-spacer"}),(0,r.jsx)(ne,{value:i,placeholder:e("search"),style:{width:180},onChange:D=>o(D.target.value)}),(0,r.jsx)(te,{icon:"refresh",title:e("refresh"),onClick:()=>{n.catalog.loadRelations(t.connectionId,t.database,t.schema,!0)}})]}),H?(0,r.jsx)(ae,{tone:"error",children:H}):null,(0,r.jsx)("div",{className:"dg-grid-wrap",children:q?(0,r.jsx)("div",{className:"dg-sqlmsg",children:(0,r.jsx)(be,{label:e("loading")})}):E.length===0?(0,r.jsx)(me,{title:e("emptyTables")}):(0,r.jsxs)("table",{className:"dg-list",children:[(0,r.jsx)("thead",{children:(0,r.jsxs)("tr",{children:[k("name",e("name")),k("rows",e("rows"),"dg-num"),k("comment",e("comment")),(0,r.jsx)("th",{style:{width:70}})]})}),(0,r.jsx)("tbody",{children:E.map(D=>(0,r.jsxs)("tr",{onDoubleClick:()=>t.onOpen(D),children:[(0,r.jsx)("td",{children:(0,r.jsxs)("span",{className:"dg-list-name",children:[(0,r.jsx)(M,{name:D.kind==="view"?"view":"table",size:11}),(0,r.jsx)("span",{className:"dg-mono",children:D.name})]})}),(0,r.jsx)("td",{className:"dg-num",children:D.rows??"\u2014"}),(0,r.jsx)("td",{className:"dg-muted dg-truncate",title:D.comment,children:D.comment}),(0,r.jsx)("td",{children:(0,r.jsxs)("span",{className:"dg-row",style:{gap:2},children:[(0,r.jsx)(te,{icon:"play",title:e("openInQuery"),size:11,onClick:()=>t.onQuery(D)}),(0,r.jsx)(te,{icon:"table",title:e("data"),size:11,onClick:()=>t.onOpen(D)})]})})]},D.name))})]})})]})}function Wt(t){let{t:e,store:n}=t,a=ue(n.connections),l=ue(n.catalog),i=a.items.find(k=>k.id===t.connectionId),o=`${t.connectionId}|${t.database.name}|${t.schemas[0]??""}`,u=l.relations[o]??[],f=a.sessions[t.connectionId];(0,ke.useEffect)(()=>{for(let k of t.schemas.length?t.schemas:[""])n.catalog.loadRelations(t.connectionId,t.database.name,k)},[t.connectionId,t.database.name,t.schemas,n]);let E=u.filter(k=>k.kind==="table").length,q=u.filter(k=>k.kind==="view").length,H=n.bindings().find(k=>k.connectionId===t.connectionId)??null;return(0,r.jsxs)("div",{className:"dg-content",children:[(0,r.jsxs)("div",{className:"dg-subbar",children:[(0,r.jsx)(M,{name:"database",size:12}),(0,r.jsx)("span",{className:"dg-mono",children:t.database.name}),(0,r.jsx)("span",{className:"dg-chip",children:i?.engine??""}),f?.version?(0,r.jsx)("span",{className:"dg-chip",children:f.version}):null]}),(0,r.jsxs)("div",{style:{overflow:"auto"},children:[(0,r.jsxs)("div",{className:"dg-cards",children:[(0,r.jsxs)("div",{className:"dg-card",onClick:()=>t.onOpenRelations("table"),style:{cursor:"pointer"},children:[(0,r.jsx)("div",{className:"dg-card-value",children:E}),(0,r.jsx)("div",{className:"dg-card-label",children:e("tables")})]}),(0,r.jsxs)("div",{className:"dg-card",onClick:()=>t.onOpenRelations("view"),style:{cursor:"pointer"},children:[(0,r.jsx)("div",{className:"dg-card-value",children:q}),(0,r.jsx)("div",{className:"dg-card-label",children:e("views")})]}),(0,r.jsxs)("div",{className:"dg-card",children:[(0,r.jsx)("div",{className:"dg-card-value",children:t.schemas.length||1}),(0,r.jsx)("div",{className:"dg-card-label",children:e("schema")})]}),(0,r.jsxs)("div",{className:"dg-card",children:[(0,r.jsx)("div",{className:"dg-card-value",children:t.database.file?Pt(t.database.file.length):"\u2014"}),(0,r.jsx)("div",{className:"dg-card-label",children:e("file")})]})]}),(0,r.jsxs)("div",{className:"dg-section",children:[(0,r.jsx)("div",{className:"dg-section-title",children:e("agentHint")}),H&&H.connectionId===t.connectionId?(0,r.jsx)(ae,{tone:"success",children:e("projectBound").replace("{name}",H.connectionName??H.connectionId).replace("{database}",H.database)}):(0,r.jsx)(ae,{children:e("projectUnbound")}),(0,r.jsx)(ae,{children:n.meta.allowWrites?e("writesEnabled"):e("readOnlyForAgent")})]}),(0,r.jsxs)("div",{className:"dg-section",children:[(0,r.jsx)("div",{className:"dg-section-title",children:e("schema")}),t.schemas.length>0?t.schemas.map(k=>(0,r.jsxs)("div",{className:"dg-row",children:[(0,r.jsx)(M,{name:"folder",size:11}),(0,r.jsx)("span",{className:"dg-mono",children:k})]},k)):(0,r.jsx)("div",{className:"dg-muted",children:"default"})]})]})]})}function Jt(t){let{t:e,store:n}=t,a=ue(n.catalog),l=`${t.connectionId}|${t.database}|${t.schema}`,i=a.routines[l]??[],[o,u]=(0,ke.useState)("");(0,ke.useEffect)(()=>{n.catalog.loadRoutines(t.connectionId,t.database,t.schema)},[t.connectionId,t.database,t.schema,n]);let f=i.find(E=>E.name===o)??null;return(0,r.jsxs)("div",{className:"dg-content",children:[(0,r.jsxs)("div",{className:"dg-subbar",children:[(0,r.jsx)(M,{name:"function",size:12}),(0,r.jsx)("span",{children:e("functions")}),(0,r.jsx)("span",{className:"dg-chip",children:i.length}),(0,r.jsx)("div",{className:"dg-spacer"}),(0,r.jsx)(te,{icon:"refresh",title:e("refresh"),onClick:()=>{n.catalog.loadRoutines(t.connectionId,t.database,t.schema,!0)}})]}),(0,r.jsxs)("div",{className:"dg-struct",style:{flex:1},children:[(0,r.jsx)("div",{className:"dg-struct-col",style:{flex:"0 0 46%"},children:(0,r.jsx)("div",{className:"dg-struct-body",style:{padding:0},children:a.loading[l]?(0,r.jsx)("div",{className:"dg-sqlmsg",children:(0,r.jsx)(be,{label:e("loading")})}):i.length===0?(0,r.jsx)(me,{title:e("noRoutines")}):(0,r.jsxs)("table",{className:"dg-list",children:[(0,r.jsx)("thead",{children:(0,r.jsxs)("tr",{children:[(0,r.jsx)("th",{children:e("name")}),(0,r.jsx)("th",{children:e("type")}),(0,r.jsx)("th",{children:e("returnType")})]})}),(0,r.jsx)("tbody",{children:i.map(E=>(0,r.jsxs)("tr",{className:E.name===o?"dg-row-active":"",onClick:()=>u(E.name),children:[(0,r.jsx)("td",{className:"dg-mono",children:E.name}),(0,r.jsx)("td",{children:E.kind==="function"?e("functionKind"):e("procedureKind")}),(0,r.jsx)("td",{className:"dg-muted dg-truncate",children:E.returnType||"\u2014"})]},`${E.kind}-${E.name}`))})]})})}),(0,r.jsxs)("div",{className:"dg-struct-col",children:[(0,r.jsx)("div",{className:"dg-struct-head",children:e("definition")}),(0,r.jsx)("div",{className:"dg-struct-body",children:f?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("div",{className:"dg-row",style:{marginBottom:6},children:[(0,r.jsx)("span",{className:"dg-mono",children:f.name}),(0,r.jsx)("span",{className:"dg-tag",children:f.language||f.kind})]}),(0,r.jsx)("pre",{className:"dg-pre",children:f.definition||"\u2014"})]}):(0,r.jsx)("div",{className:"dg-muted",children:e("selectConnection")})})]})]})]})}function Ut(t){let{t:e,store:n}=t,a=ue(n.catalog),l=a.accounts[t.connectionId]??[];return(0,ke.useEffect)(()=>{n.catalog.loadAccounts(t.connectionId)},[t.connectionId,n]),(0,r.jsxs)("div",{className:"dg-content",children:[(0,r.jsxs)("div",{className:"dg-subbar",children:[(0,r.jsx)(M,{name:"user",size:12}),(0,r.jsx)("span",{children:e("users")}),(0,r.jsx)("span",{className:"dg-chip",children:l.length}),(0,r.jsx)("div",{className:"dg-spacer"}),(0,r.jsx)(te,{icon:"refresh",title:e("refresh"),onClick:()=>{n.catalog.loadAccounts(t.connectionId,!0)}})]}),(0,r.jsx)("div",{className:"dg-grid-wrap",children:a.loading[t.connectionId]?(0,r.jsx)("div",{className:"dg-sqlmsg",children:(0,r.jsx)(be,{label:e("loading")})}):l.length===0?(0,r.jsx)(me,{title:e("noAccounts")}):(0,r.jsxs)("table",{className:"dg-list",children:[(0,r.jsx)("thead",{children:(0,r.jsxs)("tr",{children:[(0,r.jsx)("th",{children:e("accountName")}),(0,r.jsx)("th",{children:e("accountHost")}),(0,r.jsx)("th",{children:e("accountPlugin")}),(0,r.jsx)("th",{children:e("accountPrivileged")}),(0,r.jsx)("th",{children:e("accountLocked")})]})}),(0,r.jsx)("tbody",{children:l.map(i=>(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{className:"dg-mono",children:i.name}),(0,r.jsx)("td",{className:"dg-mono dg-muted",children:i.host}),(0,r.jsx)("td",{className:"dg-muted",children:i.plugin}),(0,r.jsx)("td",{children:i.privileged?"\u2713":""}),(0,r.jsx)("td",{children:i.locked?"\u2713":""})]},`${i.name}@${i.host}`))})]})})]})}function _t(t){let{t:e,store:n}=t,a=ue(n.queries);return(0,ke.useEffect)(()=>{a.items.length===0&&n.queries.load()},[a.items.length,n]),(0,r.jsxs)("div",{className:"dg-content",children:[(0,r.jsxs)("div",{className:"dg-subbar",children:[(0,r.jsx)(M,{name:"bookmark",size:12}),(0,r.jsx)("span",{children:e("queries")}),(0,r.jsx)("span",{className:"dg-chip",children:a.items.length}),(0,r.jsx)("div",{className:"dg-spacer"}),(0,r.jsx)(te,{icon:"refresh",title:e("refresh"),onClick:()=>{n.queries.load()}})]}),a.error?(0,r.jsx)(ae,{tone:"error",children:a.error}):null,(0,r.jsx)("div",{className:"dg-grid-wrap",children:a.loading&&a.items.length===0?(0,r.jsx)("div",{className:"dg-sqlmsg",children:(0,r.jsx)(be,{label:e("loading")})}):a.items.length===0?(0,r.jsx)(me,{title:e("noQueries")}):(0,r.jsxs)("table",{className:"dg-list",children:[(0,r.jsx)("thead",{children:(0,r.jsxs)("tr",{children:[(0,r.jsx)("th",{children:e("queryName")}),(0,r.jsx)("th",{children:e("database")}),(0,r.jsx)("th",{children:e("source")}),(0,r.jsx)("th",{children:e("updatedAt")}),(0,r.jsx)("th",{style:{width:96}})]})}),(0,r.jsx)("tbody",{children:a.items.map(l=>(0,r.jsxs)("tr",{onDoubleClick:()=>t.onOpen(l),children:[(0,r.jsx)("td",{children:(0,r.jsxs)("span",{className:"dg-list-name",children:[(0,r.jsx)(M,{name:"bookmark",size:11}),(0,r.jsx)("span",{children:l.name})]})}),(0,r.jsx)("td",{className:"dg-mono dg-muted",children:l.database||"\u2014"}),(0,r.jsx)("td",{children:(0,r.jsx)("span",{className:"dg-tag",children:l.scope})}),(0,r.jsx)("td",{className:"dg-muted",children:Dt(l.updatedAt)}),(0,r.jsx)("td",{children:(0,r.jsxs)("span",{className:"dg-row",style:{gap:2},children:[(0,r.jsx)(te,{icon:"play",title:e("openInEditor"),size:11,onClick:()=>t.onOpen(l)}),(0,r.jsx)(te,{icon:"trash",title:e("delete"),size:11,onClick:()=>{n.queries.remove(l.id).catch(i=>t.notify(String(i),"error"))}})]})})]},l.id))})]})})]})}var se=require("react");var x=require("react/jsx-runtime");function Xt(t){let{t:e,tab:n}=t,[a,l]=(0,se.useState)([]),[i,o]=(0,se.useState)(Number(n.database.replace(/[^0-9]/g,""))||0),[u,f]=(0,se.useState)("*"),[E,q]=(0,se.useState)(""),[H,k]=(0,se.useState)([]),[D,Q]=(0,se.useState)("0"),[P,B]=(0,se.useState)(""),[$,N]=(0,se.useState)(null),[K,w]=(0,se.useState)(""),[R,J]=(0,se.useState)(null),[p,L]=(0,se.useState)(""),[W,U]=(0,se.useState)(!1),[ye,pe]=(0,se.useState)(()=>new Set),[ee,ie]=(0,se.useState)(null),[we,ve]=(0,se.useState)("");(0,se.useEffect)(()=>{F.redisDatabases(n.connectionId).then(s=>l(s.databases)).catch(()=>{})},[n.connectionId]);let he=async s=>{try{let m=await F.redisScan({connectionId:n.connectionId,cursor:s?"0":D,pattern:u,type:E,database:i});k(O=>{let _=s?[]:O.slice(),re=new Set(_.map(fe=>fe.key));for(let fe of m.keys)re.has(fe.key)||_.push(fe);return _.sort((fe,Le)=>fe.key.localeCompare(Le.key))}),Q(m.cursor),L("")}catch(m){L(m instanceof Error?m.message:String(m))}};(0,se.useEffect)(()=>{k([]),B(""),N(null),he(!0)},[n.connectionId,i]);let de=async s=>{B(s);try{N(await F.redisKey(n.connectionId,s,i)),L("")}catch(m){N(null),L(m instanceof Error?m.message:String(m))}},Se=async s=>{U(!0);try{let m=await F.redisCommand(n.connectionId,s);J(m.reply),await he(!0),P&&await de(P),L("")}catch(m){L(m instanceof Error?m.message:String(m))}finally{U(!1)}},v=(0,se.useMemo)(()=>{let s=new Map;for(let m of H){let O=m.key.indexOf(":"),_=O>0?m.key.slice(0,O):"",re=s.get(_)??[];re.push(m),s.set(_,re)}return[...s.entries()].sort((m,O)=>m[0]===""?1:O[0]===""?-1:m[0].localeCompare(O[0]))},[H]),d=()=>$?$.value===null||$.value===void 0?(0,x.jsx)(me,{title:e("null")}):$.type==="string"?(0,x.jsx)("pre",{className:"dg-pre",style:{padding:9},children:String($.value)}):$.type==="hash"?(0,x.jsx)("div",{className:"dg-grid-wrap",children:(0,x.jsx)("table",{className:"dg-grid",style:{width:"100%"},children:(0,x.jsx)("tbody",{children:Object.entries($.value).map(([s,m])=>(0,x.jsxs)("tr",{children:[(0,x.jsx)("td",{className:"dg-mono",style:{width:"32%"},children:s}),(0,x.jsx)("td",{children:String(m)})]},s))})})}):Array.isArray($.value)?(0,x.jsx)("div",{className:"dg-grid-wrap",children:(0,x.jsx)("table",{className:"dg-grid",style:{width:"100%"},children:(0,x.jsx)("tbody",{children:$.value.map((s,m)=>(0,x.jsxs)("tr",{children:[(0,x.jsx)("td",{className:"dg-rownum",children:m}),(0,x.jsx)("td",{className:"dg-mono",children:typeof s=="object"?JSON.stringify(s):String(s)})]},m))})})}):(0,x.jsx)("pre",{className:"dg-pre",style:{padding:9},children:JSON.stringify($.value,null,2)}):(0,x.jsx)(me,{title:e("keyValue")});return(0,x.jsxs)("div",{className:"dg-redis",children:[(0,x.jsxs)("div",{className:"dg-redis-list",children:[(0,x.jsxs)("div",{className:"dg-panehead",children:[(0,x.jsx)(M,{name:"database",size:11}),e("redisKeys"),(0,x.jsx)("div",{className:"dg-spacer"}),(0,x.jsx)(xe,{value:String(i),onChange:s=>o(Number(s.target.value)),children:(a.length?a:[{name:"db0",schemas:[]}]).map(s=>(0,x.jsx)("option",{value:s.name.replace("db",""),children:s.name},s.name))}),(0,x.jsx)(te,{icon:"plus",title:e("newKey"),size:11,onClick:()=>{ie({kind:"new"}),ve("")}}),(0,x.jsx)(te,{icon:"refresh",title:e("refresh"),size:11,onClick:()=>{he(!0)}})]}),(0,x.jsxs)("div",{className:"dg-row",style:{padding:"4px 6px",gap:4},children:[(0,x.jsxs)("div",{className:"dg-search",children:[(0,x.jsx)(M,{name:"search",size:10}),(0,x.jsx)("input",{value:u,placeholder:e("redisPattern"),onChange:s=>f(s.target.value),onKeyDown:s=>s.key==="Enter"&&void he(!0)})]}),(0,x.jsxs)(xe,{value:E,onChange:s=>{q(s.target.value),he(!0)},children:[(0,x.jsx)("option",{value:"",children:"any"}),["string","hash","list","set","zset","stream"].map(s=>(0,x.jsx)("option",{value:s,children:s},s))]})]}),(0,x.jsx)("div",{className:"dg-redis-keys",children:H.length===0?(0,x.jsx)("div",{className:"dg-muted",style:{padding:7},children:e("emptyObjects")}):v.map(([s,m])=>{let O=s===""||!ye.has(s);return(0,x.jsxs)("div",{children:[s?(0,x.jsxs)("div",{className:"dg-rns",onClick:()=>pe(_=>{let re=new Set(_);return re.has(s)?re.delete(s):re.add(s),re}),children:[(0,x.jsx)("span",{className:`dg-twist${O?" dg-twist-open":""}`,children:(0,x.jsx)(M,{name:"chevron",size:8})}),(0,x.jsx)(M,{name:"folder",size:10}),(0,x.jsxs)("span",{className:"dg-truncate",style:{flex:1},children:[s,":"]}),(0,x.jsx)("span",{className:"dg-badge",children:m.length})]}):null,O?m.map(_=>(0,x.jsxs)("div",{className:`dg-rkey${_.key===P?" dg-rkey-active":""}`,onClick:()=>{de(_.key)},title:_.key,children:[(0,x.jsx)("span",{className:"dg-truncate",style:{flex:1},children:s?_.key.slice(s.length+1):_.key}),(0,x.jsx)("span",{className:"dg-badge",children:_.type})]},_.key)):null]},s||"_")})}),D!=="0"?(0,x.jsx)("div",{className:"dg-pager",children:(0,x.jsx)(A,{size:"sm",onClick:()=>{he(!1)},children:e("scanMore")})}):null]}),(0,x.jsxs)("div",{className:"dg-redis-detail",children:[p?(0,x.jsx)(ae,{tone:"error",onClose:()=>L(""),children:p}):null,$?(0,x.jsxs)("div",{className:"dg-subbar",children:[(0,x.jsx)("span",{className:"dg-mono dg-truncate",title:$.key,children:$.key}),(0,x.jsx)("span",{className:"dg-tag",children:$.type}),(0,x.jsxs)("span",{className:"dg-chip",children:[e("ttl"),": ",$.ttl>0?`${$.ttl}s`:e("noTtl")]}),(0,x.jsx)("div",{className:"dg-spacer"}),(0,x.jsx)(A,{size:"sm",onClick:()=>{ie({kind:"rename"}),ve($.key)},children:e("rename")}),(0,x.jsx)(A,{size:"sm",onClick:()=>{ie({kind:"ttl"}),ve($.ttl>0?String($.ttl):"3600")},children:e("setTtl")}),(0,x.jsx)(A,{size:"sm",onClick:()=>{ie({kind:"value"}),ve(String($.value??""))},children:e("editValue")}),(0,x.jsx)(A,{size:"sm",variant:"danger",onClick:()=>{(async()=>{await F.redisDelete(n.connectionId,$.key,$.database??i),B(""),N(null),await he(!0),t.notify(e("deleted"),"success")})()},children:e("deleteKey")})]}):null,(0,x.jsx)("div",{className:"dg-grid-wrap",children:d()}),(0,x.jsxs)("div",{className:"dg-redis-console",children:[(0,x.jsxs)("div",{className:"dg-row",children:[(0,x.jsx)(M,{name:"play",size:10}),(0,x.jsx)(ne,{value:K,placeholder:e("commandHint"),style:{flex:1},onChange:s=>w(s.target.value),onKeyDown:s=>s.key==="Enter"&&K.trim()&&void Se(K)}),(0,x.jsx)(A,{size:"sm",variant:"primary",disabled:W,onClick:()=>K.trim()&&void Se(K),children:e("run")})]}),R!==null?(0,x.jsx)("pre",{className:"dg-pre",style:{maxHeight:110,overflow:"auto"},children:JSON.stringify(R,null,2)}):null]})]}),ee?(0,x.jsx)(Ee,{title:ee.kind==="new"?e("newKey"):ee.kind==="rename"?e("rename"):ee.kind==="ttl"?e("setTtl"):e("editValue"),width:420,onClose:()=>ie(null),footer:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(A,{onClick:()=>ie(null),children:e("cancel")}),(0,x.jsx)(A,{variant:"primary",onClick:()=>{(async()=>{let s=O=>O.replace(/\\/g,"\\\\").replace(/"/g,'\\"'),m="";ee.kind==="new"&&(m=`SET "${s(we)}" ""`),ee.kind==="rename"&&$&&(m=`RENAME "${s($.key)}" "${s(we)}"`),ee.kind==="ttl"&&$&&(m=`EXPIRE "${s($.key)}" ${Number.parseInt(we,10)||0}`),ee.kind==="value"&&$&&(m=`SET "${s($.key)}" "${s(we)}"`),m&&await Se(m),ie(null),t.notify(e("saved"),"success")})()},children:e("save")})]}),children:(0,x.jsx)(oe,{label:ee.kind==="ttl"?e("ttl"):ee.kind==="value"?e("keyValue"):e("name"),children:(0,x.jsx)(ne,{value:we,autoFocus:!0,onChange:s=>ve(s.target.value)})})}):null]})}var le=require("react");var T=require("react/jsx-runtime");function Gt(t){let{t:e,tab:n}=t,[a,l]=(0,le.useState)(n.initialSql??""),[i,o]=(0,le.useState)(null),[u,f]=(0,le.useState)(0),[E,q]=(0,le.useState)(!1),[H,k]=(0,le.useState)(""),[D,Q]=(0,le.useState)(""),[P,B]=(0,le.useState)(null),[$,N]=(0,le.useState)(0),[K,w]=(0,le.useState)(!1),[R,J]=(0,le.useState)(""),p=(0,le.useRef)(null),L=(0,le.useRef)(null),W=(0,le.useMemo)(()=>a.split(`
`).length,[a]),U=(0,le.useMemo)(()=>{let v=[];for(let d of t.tables)v.push({label:d,kind:"table"});for(let d of dt)v.push({label:d,kind:"fn"});for(let d of it)v.push({label:d,kind:"kw"});return v},[t.tables]);(0,le.useEffect)(()=>{n.initialSql&&l(n.initialSql)},[n.id,n.initialSql]);let ye=v=>{let d=p.current;if(!d)return;let s=d.selectionStart,m=/([A-Za-z_][A-Za-z0-9_]*)$/.exec(a.slice(0,s))?.[1]??"";if(!m&&!v)return B(null);let O=m.toLowerCase(),_=new Set,re=U.filter(Le=>{let Te=Le.label.toLowerCase();return O&&!Te.startsWith(O)||_.has(Te)?!1:(_.add(Te),!0)}).slice(0,14);if(re.length===0)return B(null);let fe=Rt(d,s-m.length);B({items:re,index:0,left:fe.left,top:fe.top+18,start:s-m.length,end:s})},pe=()=>{if(!P)return;let v=P.items[P.index];if(!v)return;let d=P.start+v.label.length;l(`${a.slice(0,P.start)}${v.label}${a.slice(P.end)}`),B(null),requestAnimationFrame(()=>{let s=p.current;s&&(s.focus(),s.selectionStart=s.selectionEnd=d)})},ee=async v=>{let d=v.trim();if(!d)return t.notify(e("noStatements"),"info");q(!0),k("");try{let s=await F.sql({connectionId:n.connectionId,database:n.database,sql:d});o(s),f(0);let m=s.results.find(_=>_.error),O=s.results[0];Q(m?ce(e("queryFailed"),{ms:s.durationMs}):ce(e("queryOk"),{n:O?.rowCount??0,ms:s.durationMs})),s.results.some(_=>_.truncated)&&k(e("resultTruncated")),m?.error&&k(m.error)}catch(s){k(s instanceof Error?s.message:String(s)),o(null),Q("")}finally{q(!1)}},ie=async()=>{try{let v=await F.sqlCancel(n.connectionId);t.notify(v.cancelled?e("queryCancelled"):v.reason||e("cancelUnsupported"),v.cancelled?"info":"error")}catch(v){t.notify(v instanceof Error?v.message:String(v),"error")}},we=()=>{let v=p.current;v&&v.selectionStart!==v.selectionEnd?ee(a.slice(v.selectionStart,v.selectionEnd)):ee(a)},ve=()=>{let v=a.split(";").map(d=>d.trim()).filter(Boolean)[0];if(!v)return t.notify(e("noStatements"),"info");ee(/^explain\b/i.test(v)?v:`EXPLAIN ${v}`)},he=v=>{if(P){if(v.key==="ArrowDown")return v.preventDefault(),B({...P,index:(P.index+1)%P.items.length});if(v.key==="ArrowUp")return v.preventDefault(),B({...P,index:(P.index-1+P.items.length)%P.items.length});if(v.key==="Enter"||v.key==="Tab")return v.preventDefault(),pe();if(v.key==="Escape")return v.preventDefault(),B(null)}if((v.ctrlKey||v.metaKey)&&v.key==="Enter")return v.preventDefault(),we();if(v.ctrlKey&&v.key===" ")return v.preventDefault(),ye(!0);if(v.key==="Tab"){v.preventDefault();let d=v.currentTarget,s=d.selectionStart,m=d.selectionEnd;l(`${a.slice(0,s)}  ${a.slice(m)}`),requestAnimationFrame(()=>{d.selectionStart=d.selectionEnd=s+2})}},de=i?.results[u]??null,Se=()=>i?de?de.error?(0,T.jsxs)("div",{style:{padding:9},children:[(0,T.jsx)("div",{className:"dg-err",children:de.error}),(0,T.jsx)("pre",{className:"dg-pre",style:{marginTop:7,opacity:.7},children:de.statement})]}):de.columns.length===0?(0,T.jsxs)("div",{className:"dg-sqlmsg",children:[ce(e("affected"),{n:de.affected??0})," \xB7 ",de.durationMs," ms"]}):(0,T.jsx)("div",{className:"dg-grid-wrap",children:(0,T.jsxs)("table",{className:"dg-grid",style:{width:"100%"},children:[(0,T.jsx)("thead",{children:(0,T.jsxs)("tr",{children:[(0,T.jsx)("th",{className:"dg-rownum",children:"#"}),de.columns.map(v=>(0,T.jsx)("th",{children:v.name},v.name))]})}),(0,T.jsx)("tbody",{children:de.rows.map((v,d)=>(0,T.jsxs)("tr",{children:[(0,T.jsx)("td",{className:"dg-rownum",children:d+1}),de.columns.map(s=>{let m=We(v[s.name],e("null"));return(0,T.jsx)("td",{className:m.isNull?"dg-null":"",title:m.text,children:m.text},s.name)})]},d))})]})}):(0,T.jsx)(me,{title:e("emptyResult")}):(0,T.jsx)(me,{title:e("runHint"),hint:e("completionHint")});return(0,T.jsxs)("div",{className:"dg-sql",children:[(0,T.jsxs)("div",{className:"dg-sql-top",children:[(0,T.jsxs)("div",{className:"dg-editor",children:[(0,T.jsx)("div",{className:"dg-gutter","aria-hidden":!0,children:(0,T.jsx)("div",{style:{transform:`translateY(${-$}px)`},children:Array.from({length:W},(v,d)=>d+1).join(`
`)})}),(0,T.jsxs)("div",{className:"dg-code",children:[(0,T.jsxs)("pre",{className:"dg-hl",ref:L,"aria-hidden":!0,children:[lt(a).map((v,d)=>v.type==="ws"?v.value:(0,T.jsx)("span",{className:`dg-tok dg-tok-${v.type==="plain"?"ident":v.type}`,children:v.value},d)),(0,T.jsx)("span",{children:"\u200B"})]}),(0,T.jsx)("textarea",{ref:p,className:"dg-sql-text",value:a,spellCheck:!1,placeholder:"SELECT * FROM ...",onChange:v=>{l(v.target.value),requestAnimationFrame(()=>ye(!1))},onScroll:v=>{if(N(v.currentTarget.scrollTop),L.current){let d=v.currentTarget;L.current.scrollTop=d.scrollTop,L.current.scrollLeft=d.scrollLeft}},onKeyDown:he,onBlur:()=>setTimeout(()=>B(null),120)}),P?(0,T.jsx)("div",{className:"dg-complete",style:{left:P.left,top:P.top},children:P.items.map((v,d)=>(0,T.jsxs)("div",{className:`dg-complete-item${d===P.index?" dg-complete-item-on":""}`,onMouseDown:s=>{s.preventDefault(),B({...P,index:d}),requestAnimationFrame(pe)},children:[(0,T.jsx)("span",{children:v.label}),(0,T.jsx)("span",{className:"dg-complete-kind",children:v.kind})]},`${v.kind}-${v.label}`))}):null]})]}),(0,T.jsxs)("div",{className:"dg-sqlbar",children:[(0,T.jsxs)(A,{size:"sm",variant:"primary",disabled:E,onClick:we,children:[E?(0,T.jsx)(be,{}):(0,T.jsx)(M,{name:"play",size:10}),e("run")]}),E?(0,T.jsx)(A,{size:"sm",variant:"danger",onClick:()=>{ie()},children:e("cancelQuery")}):null,(0,T.jsx)(A,{size:"sm",disabled:E,onClick:ve,children:e("explain")}),(0,T.jsxs)(A,{size:"sm",onClick:()=>l(St(a)),children:[(0,T.jsx)(M,{name:"wand",size:10}),e("beautify")]}),(0,T.jsxs)(A,{size:"sm",onClick:()=>{J(R||`Query ${new Date().toISOString().slice(0,16).replace("T"," ")}`),w(!0)},children:[(0,T.jsx)(M,{name:"bookmark",size:10}),e("saveQuery")]}),(0,T.jsx)(A,{size:"sm",variant:"ghost",onClick:()=>{l(""),o(null),k(""),Q("")},children:e("clear")}),(0,T.jsx)("span",{className:"dg-muted dg-hint",children:e("runHint")}),(0,T.jsx)("div",{className:"dg-spacer"}),D?(0,T.jsx)("span",{className:"dg-chip",children:D}):null]})]}),i&&i.results.length>1?(0,T.jsx)("div",{className:"dg-rtabs",children:i.results.map((v,d)=>(0,T.jsxs)("button",{type:"button",className:`dg-rtab${d===u?" dg-rtab-active":""}`,onClick:()=>f(d),children:[v.error?(0,T.jsx)(M,{name:"alert",size:10}):null,ce(e("result"),{n:d+1})," \xB7 ",v.rowCount]},d))}):null,H&&!de?.error?(0,T.jsx)(ae,{tone:"error",onClose:()=>k(""),children:H}):null,(0,T.jsx)("div",{className:"dg-results",children:Se()}),K?(0,T.jsxs)(Ee,{title:e("saveQuery"),width:420,onClose:()=>w(!1),footer:(0,T.jsxs)(T.Fragment,{children:[(0,T.jsx)(A,{onClick:()=>w(!1),children:e("cancel")}),(0,T.jsx)(A,{variant:"primary",onClick:()=>{(async()=>{try{await F.saveQuery({name:R.trim()||"Query",sql:a,connectionId:n.connectionId,database:n.database,scope:"user"}),w(!1),t.notify(e("querySaved"),"success"),t.onSaved()}catch(v){t.notify(v instanceof Error?v.message:String(v),"error")}})()},children:e("save")})]}),children:[(0,T.jsx)(oe,{label:e("queryName"),children:(0,T.jsx)(ne,{value:R,autoFocus:!0,onChange:v=>J(v.target.value)})}),(0,T.jsx)("pre",{className:"dg-pre",style:{maxHeight:160,overflow:"auto"},children:a})]}):null]})}var V=require("react");var c=require("react/jsx-runtime"),Mn=[50,100,200,500];function zn(t){let e=String(t??"").toLowerCase();if(/\b(json|jsonb|xml|text|clob|ntext|longtext|mediumtext|bytea)\b/.test(e))return!0;let n=/(?:var)?char(?:acter varying)?\s*\(\s*(\d+)\s*\)/.exec(e);return n?Number(n[1])>120:!1}function Yt(t){let{t:e,tab:n,engine:a}=t,[l,i]=(0,V.useState)("data"),o={connectionId:n.connectionId,database:n.database,schema:n.schema,table:n.table},u=`${o.connectionId}|${o.database}|${o.schema}|${o.table}`,[f,E]=(0,V.useState)(null),[q,H]=(0,V.useState)(""),[k,D]=(0,V.useState)(0);return(0,V.useEffect)(()=>{let Q=!1;return F.describe(o.connectionId,o.database,o.schema,o.table).then(P=>{Q||(E(P),H(""))}).catch(P=>{Q||H(P instanceof Error?P.message:String(P))}),()=>{Q=!0}},[u,k]),(0,c.jsxs)("div",{className:"dg-content",children:[(0,c.jsxs)("div",{className:"dg-subbar",children:[(0,c.jsx)(M,{name:n.tableKind==="view"?"view":"table",size:12}),(0,c.jsx)("span",{className:"dg-mono",children:n.table}),(0,c.jsx)("span",{className:"dg-chip",children:n.database||"main"}),n.schema?(0,c.jsx)("span",{className:"dg-chip",children:n.schema}):null,(0,c.jsx)("div",{className:"dg-spacer"}),(0,c.jsx)(Bt,{value:l,onChange:i,options:[{value:"data",label:e("data")},{value:"structure",label:e("structure")}]})]}),l==="data"?(0,c.jsx)(Pn,{t:e,scope:o,engine:a,notify:t.notify,meta:f,onRefreshMeta:()=>D(Q=>Q+1)}):(0,c.jsx)(Dn,{t:e,meta:f,error:q,onRefresh:()=>D(Q=>Q+1)})]})}function Pn({t,scope:e,engine:n,notify:a,meta:l,onRefreshMeta:i}){let[o,u]=(0,V.useState)(1),[f,E]=(0,V.useState)(100),[q,H]=(0,V.useState)({column:"",dir:""}),[k,D]=(0,V.useState)(""),[Q,P]=(0,V.useState)(!1),[B,$]=(0,V.useState)([]),[N,K]=(0,V.useState)("AND"),[w,R]=(0,V.useState)(null),[J,p]=(0,V.useState)(!1),[L,W]=(0,V.useState)(""),[U,ye]=(0,V.useState)(null),[pe,ee]=(0,V.useState)(null),[ie,we]=(0,V.useState)(0),[ve,he]=(0,V.useState)(null),[de,Se]=(0,V.useState)(!1),[v,d]=(0,V.useState)([]),[s,m]=(0,V.useState)(null),[O,_]=(0,V.useState)(!1),[re,fe]=(0,V.useState)(null),Le=(0,V.useRef)(null),Te=(0,V.useRef)(!1),bt=(0,V.useRef)(null),Ye=`${e.connectionId}|${e.database}|${e.schema}|${e.table}`,[Fe,Ze]=(0,V.useState)("");(0,V.useEffect)(()=>{if(Fe===k)return;let g=setTimeout(()=>{D(Fe),u(1)},320);return()=>clearTimeout(g)},[Fe,k]);let et=(0,V.useRef)(""),tt=(0,V.useRef)(!1),nt=`${Ye}|${k}|${q.column}|${q.dir}`;(0,V.useEffect)(()=>{let g=new AbortController,h=!1;p(!0),W("");let y=tt.current?"exact":et.current===nt?"none":"auto";return F.rows({...e,page:o,pageSize:f,orderBy:q.column,orderDir:q.dir,where:k,total:y},g.signal).then(b=>{h||(et.current=nt,tt.current=!1,R(I=>({...b,total:typeof b.total=="number"?b.total:I?.total??b.rows.length,totalKind:b.totalKind==="none"&&I?I.totalKind:b.totalKind})))}).catch(b=>{h||b instanceof DOMException&&b.name==="AbortError"||(W(b instanceof Error?b.message:String(b)),R(null))}).finally(()=>{h||p(!1)}),()=>{h=!0,g.abort()}},[Ye,o,f,q.column,q.dir,k,ie,nt]);let Re=l?.columns??[],je=(0,V.useMemo)(()=>Re.filter(g=>g.primaryKey).map(g=>g.name),[Re]),Ne=w?.rows??[],yt=w?.total??0,at=Math.max(1,Math.ceil(yt/f)),Me=je.length===0,qe=(w?.columns??[]).filter(g=>!v.includes(g.name)),an=Re.length>0?Re.map(g=>({name:g.name,type:g.type,primaryKey:!!g.primaryKey,nullable:g.nullable})):(w?.columns??[]).map(g=>({name:g.name,type:g.type??"",primaryKey:!1,nullable:!0})),Ae=(0,V.useCallback)(()=>{et.current="",tt.current=!0,we(g=>g+1),i()},[i]);(0,V.useEffect)(()=>{ye(null),ee(null)},[Ye,o,f,k,ie]);let ze=(0,V.useMemo)(()=>{if(!U||!w)return null;let g=[],h=0;for(let b=U.top;b<=U.bottom;b+=1){let I=Ne[b];if(I)for(let Y=U.left;Y<=U.right;Y+=1){let Z=qe[Y];if(!Z)continue;h+=1;let X=Number(I[Z.name]);!Number.isNaN(X)&&I[Z.name]!==null&&g.push(X)}}if(g.length===0)return{cells:h,count:0,sum:0,avg:0};let y=g.reduce((b,I)=>b+I,0);return{cells:h,count:g.length,sum:y,avg:y/g.length}},[U,w,Ne]),sn=g=>{H(h=>h.column!==g?{column:g,dir:"asc"}:h.dir==="asc"?{column:g,dir:"desc"}:{column:"",dir:""}),u(1)},rn=async()=>{if(!U||!w)return;let g=[];for(let h=U.top;h<=U.bottom;h+=1){let y=Ne[h];y&&g.push(qe.slice(U.left,U.right+1).map(b=>Je(y[b.name])).join("	"))}try{await navigator.clipboard.writeText(g.join(`
`)),a(t("copied"),"success")}catch{a(t("error"),"error")}},wt=async(g,h,y)=>{let b=pe;if(ee(null),!b)return;let I=y==null?"":String(y);if(b.value===I)return;if(Me)return a(t("noPrimaryKey"),"error");let Y=Ne[g];if(!Y)return;let Z={};for(let ge of je)Z[ge]=Y[ge];let X=qe[h];if(X)try{await F.updateRow({...e,key:Z,changes:{[X.name]:b.value===""&&y===null?null:b.value}}),a(t("cellSaved"),"success"),Ae()}catch(ge){a(ge instanceof Error?ge.message:String(ge),"error")}},on=async g=>{let h=Ne[g];if(!h||Me||!window.confirm(t("confirmDelete")))return;let y={};for(let b of je)y[b]=h[b];try{await F.deleteRow({...e,key:y}),a(t("deleted"),"success"),Ae()}catch(b){a(b instanceof Error?b.message:String(b),"error")}},Qe=async g=>{try{let h=await F.exportRows({...e,where:k,orderBy:q.column,orderDir:q.dir}),y=It(e.table);if(g==="csv"){let b=h.columns.map(Y=>Y.name),I=[b.map(Je).join(",")].concat(h.rows.map(Y=>b.map(Z=>Je(Y[Z])).join(","))).join(`\r
`);He(`${y}.csv`,"text/csv",I)}else g==="json"?He(`${y}.json`,"application/json",JSON.stringify(h.rows,null,2)):g==="insert"?He(`${y}.sql`,"application/sql",Tt(n,e,h.columns,h.rows)):He(`${y}.md`,"text/markdown",Mt(h.columns,h.rows));h.truncated&&a(ce(t("exportTruncated"),{n:h.rows.length}),"info")}catch(h){a(h instanceof Error?h.message:String(h),"error")}},xt=200,dn=async g=>{let h=await g.text(),y=zt(h);if(y.header.length===0||y.rows.length===0){a(t("importEmpty"),"error");return}let b=new Set((Re.length?Re:w?.columns??[]).map(X=>X.name));if(b.size===0){a(t("importNoColumns"),"error");return}let I=y.header.filter(X=>!b.has(X));if(I.length>0){a(ce(t("importUnknownColumns"),{cols:I.join(", ")}),"error");return}let Y=y.rows.map(X=>{let ge={};return y.header.forEach((Ve,pn)=>{let kt=X[pn]??"";ge[Ve]=kt===""?null:kt}),ge});Se(!0);let Z=0;try{for(let X=0;X<Y.length;X+=xt){let ge=Y.slice(X,X+xt),Ve=await F.insertRows({...e,rows:ge});Z+=Ve.inserted}a(ce(t("importDone"),{n:Z}),"success"),Ae()}catch(X){let ge=X instanceof Error?X.message:String(X);a(ce(t("importFailed"),{n:Z,error:ge}),"error")}finally{Se(!1)}},ln=async()=>{try{let g=await F.insertRow({...e,values:{}});a(g.affected>0?t("rowInserted"):t("insertRowFailed"),g.affected>0?"success":"error"),Ae()}catch(g){a(g instanceof Error?g.message:String(g),"error")}},cn=g=>{let h=Ne[g];if(!h||Me)return;let y={};for(let b of w?.columns??[]){let I=h[b.name];y[b.name]=I==null?"":String(I)}m({rowIndex:g,draft:y})},gn=async()=>{let g=s,h=g?Ne[g.rowIndex]:void 0;if(!g||!h)return;let y={};for(let I of w?.columns??[]){let Y=h[I.name],Z=Y==null?"":String(Y),X=g.draft[I.name]??"";if(X===Z)continue;let ge=Re.find(Ve=>Ve.name===I.name);y[I.name]=X===""&&(ge?.nullable??!0)?null:X}if(Object.keys(y).length===0){m(null);return}let b={};for(let I of je)b[I]=h[I];_(!0);try{await F.updateRow({...e,key:b,changes:y}),a(t("rowSaved"),"success"),m(null),Ae()}catch(I){a(I instanceof Error?I.message:String(I),"error")}finally{_(!1)}},st=(g,h,y)=>{ye(b=>y&&b?{top:Math.min(b.top,g),left:Math.min(b.left,h),bottom:Math.max(b.bottom,g),right:Math.max(b.right,h)}:{top:g,left:h,bottom:g,right:h})},un=g=>{if((g.ctrlKey||g.metaKey)&&g.key.toLowerCase()==="c"){g.preventDefault(),rn();return}if(!U)return;let y={ArrowUp:[-1,0],ArrowDown:[1,0],ArrowLeft:[0,-1],ArrowRight:[0,1]}[g.key];if(!y)return;g.preventDefault();let b=Math.max(0,Math.min(Ne.length-1,U.top+y[0])),I=Math.max(0,Math.min(qe.length-1,U.left+y[1]));st(b,I,g.shiftKey)},mn=qe.map((g,h)=>(0,c.jsxs)("th",{className:q.column===g.name?"dg-th-sorted":"",onClick:()=>sn(g.name),title:g.name,children:[g.name,q.column===g.name?(0,c.jsx)("span",{className:"dg-sortmark",children:q.dir==="desc"?"\u25BC":"\u25B2"}):null,je.includes(g.name)?(0,c.jsx)("span",{className:"dg-colkey",title:t("primaryKey"),children:(0,c.jsx)(M,{name:"key",size:10})}):null,(0,c.jsx)("span",{className:"dg-colresize",onMouseDown:y=>{y.stopPropagation();let b=y.clientX,I=y.target.parentElement,Y=I?.offsetWidth??160,Z=ge=>{I&&(I.style.width=`${Math.max(60,Y+ge.clientX-b)}px`)},X=()=>{window.removeEventListener("mousemove",Z),window.removeEventListener("mouseup",X)};window.addEventListener("mousemove",Z),window.addEventListener("mouseup",X)},onClick:y=>y.stopPropagation()})]},g.name));return(0,c.jsxs)("div",{className:"dg-content",children:[Me?(0,c.jsx)(ae,{tone:"info",children:t("noPrimaryKey")}):null,L?(0,c.jsx)(ae,{tone:"error",onClose:()=>W(""),children:L}):null,(0,c.jsxs)("div",{className:"dg-subbar",children:[(0,c.jsxs)(A,{size:"sm",active:!!k,onClick:()=>{let g=ct(n,{joiner:N,conditions:B});Ze(g),D(g),u(1)},children:[(0,c.jsx)(M,{name:"filter",size:11}),t("filter")]}),(0,c.jsx)(A,{size:"sm",variant:"ghost",onClick:()=>P(g=>!g),children:t("filterBuilder")}),(0,c.jsx)(ne,{value:Fe,placeholder:t("rawWhere"),style:{flex:1,minWidth:120,maxWidth:380},onChange:g=>Ze(g.target.value),onKeyDown:g=>{g.key==="Enter"&&(D(Fe),u(1))}}),k?(0,c.jsx)(A,{size:"sm",variant:"ghost",onClick:()=>{Ze(""),D(""),$([]),u(1)},children:t("clear")}):null,(0,c.jsx)("div",{className:"dg-spacer"}),(0,c.jsxs)("span",{className:"dg-chip",title:w?.totalKind==="estimate"?t("estimatedTotal"):void 0,children:[w?.totalKind==="estimate"?"\u2248 ":"",(0,c.jsx)("b",{children:yt})," ",t("rows")]}),(0,c.jsx)(te,{icon:"refresh",title:t("refresh"),onClick:Ae}),(0,c.jsx)(A,{size:"sm",variant:"ghost",onClick:()=>{ln()},children:t("insertRow")}),(0,c.jsx)("input",{ref:Le,type:"file",accept:".csv,text/csv",style:{display:"none"},onChange:g=>{let h=g.target.files?.[0];h&&dn(h),g.target.value=""}}),(0,c.jsxs)(A,{size:"sm",variant:"ghost",disabled:de,onClick:()=>Le.current?.click(),children:[de?(0,c.jsx)(be,{}):null,t("importCsv")]}),(0,c.jsx)(A,{size:"sm",variant:"ghost",onClick:g=>{let h=g.currentTarget.getBoundingClientRect();fe({x:h.left,y:h.bottom+2})},children:t("columnChooser")}),(0,c.jsx)(A,{size:"sm",variant:"ghost",onClick:g=>{let h=g.currentTarget.getBoundingClientRect();he({x:h.left,y:h.bottom+2})},children:t("exportAs")})]}),Q?(0,c.jsxs)("div",{className:"dg-subbar",style:{gap:6,flexWrap:"wrap"},children:[(0,c.jsxs)(xe,{value:N,onChange:g=>K(g.target.value),children:[(0,c.jsx)("option",{value:"AND",children:t("matchAll")}),(0,c.jsx)("option",{value:"OR",children:t("matchAny")})]}),B.map((g,h)=>(0,c.jsxs)("span",{className:"dg-row",style:{gap:3},children:[(0,c.jsx)(xe,{value:g.column,onChange:y=>$(b=>b.map((I,Y)=>Y===h?{...I,column:y.target.value}:I)),children:Re.map(y=>(0,c.jsx)("option",{value:y.name,children:y.name},y.name))}),(0,c.jsx)(xe,{value:g.op,onChange:y=>$(b=>b.map((I,Y)=>Y===h?{...I,op:y.target.value}:I)),children:Et.map(y=>(0,c.jsx)("option",{value:y,children:y},y))}),(0,c.jsx)(ne,{value:g.value,style:{width:120},onChange:y=>$(b=>b.map((I,Y)=>Y===h?{...I,value:y.target.value}:I))}),(0,c.jsx)(te,{icon:"x",title:t("delete"),size:10,onClick:()=>$(y=>y.filter((b,I)=>I!==h))})]},h)),(0,c.jsxs)(A,{size:"sm",onClick:()=>$(g=>g.concat({column:Re[0]?.name??"",op:"=",value:""})),children:[(0,c.jsx)(M,{name:"plus",size:10}),t("addCondition")]}),(0,c.jsx)(A,{size:"sm",variant:"primary",onClick:()=>{D(ct(n,{joiner:N,conditions:B})),u(1)},children:t("apply")})]}):null,(0,c.jsxs)("div",{className:"dg-grid-wrap",children:[J&&!w?(0,c.jsx)("div",{className:"dg-sqlmsg",children:(0,c.jsx)(be,{label:t("loading")})}):null,w&&Ne.length===0?(0,c.jsx)(me,{title:t("emptyTable")}):null,w&&Ne.length>0?(0,c.jsxs)("table",{className:"dg-grid",ref:bt,tabIndex:0,onKeyDown:un,children:[(0,c.jsx)("thead",{children:(0,c.jsxs)("tr",{children:[(0,c.jsx)("th",{className:"dg-rownum",children:"#"}),mn,(0,c.jsx)("th",{style:{width:26}})]})}),(0,c.jsx)("tbody",{children:Ne.map((g,h)=>(0,c.jsxs)("tr",{children:[(0,c.jsx)("td",{className:`dg-rownum${Me?"":" dg-rownum-editable"}`,title:Me?void 0:t("editRow"),onClick:()=>cn(h),children:(o-1)*f+h+1}),qe.map((y,b)=>{let I=We(g[y.name],t("null")),Y=U&&h>=U.top&&h<=U.bottom&&b>=U.left&&b<=U.right;return pe&&pe.row===h&&pe.column===b?(0,c.jsx)("td",{className:"dg-cell-editing",children:(0,c.jsx)("input",{autoFocus:!0,value:pe.value,onChange:Z=>ee({...pe,value:Z.target.value}),onBlur:()=>{wt(h,b,g[y.name])},onKeyDown:Z=>{Z.key==="Enter"&&(Z.preventDefault(),wt(h,b,g[y.name])),Z.key==="Escape"&&ee(null)}})},y.name):(0,c.jsx)("td",{className:`${Y?"dg-cell-selected":""}${I.isNull?" dg-null":""}${/int|numeric|decimal|real|double|float|money/i.test(y.type??"")?" dg-cell-num":""}`,title:I.isNull?t("null"):I.text,onMouseDown:Z=>{Te.current=!0,bt.current?.focus(),st(h,b,Z.shiftKey);let X=()=>{Te.current=!1,window.removeEventListener("mouseup",X)};window.addEventListener("mouseup",X)},onMouseEnter:()=>{Te.current&&st(h,b,!1)},onDoubleClick:()=>{if(Me)return a(t("noPrimaryKey"),"error");ee({row:h,column:b,value:I.isNull?"":String(g[y.name])})},children:I.text},y.name)}),(0,c.jsx)("td",{children:(0,c.jsx)(te,{icon:"trash",title:t("deleteRow"),size:11,onClick:()=>{on(h)}})})]},h))})]}):null]}),(0,c.jsxs)("div",{className:"dg-pager",children:[(0,c.jsx)(te,{icon:"chevronLeft",title:t("prev"),size:11,disabled:o<=1,onClick:()=>u(g=>Math.max(1,g-1))}),(0,c.jsx)("span",{children:ce(t("page"),{page:o,pages:at})}),(0,c.jsx)(te,{icon:"chevron",title:t("next"),size:11,disabled:o>=at,onClick:()=>u(g=>Math.min(at,g+1))}),(0,c.jsx)("div",{className:"dg-spacer"}),ze&&ze.cells>0?(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("span",{className:"dg-chip",children:ce(t("selection"),{n:ze.cells})}),ze.count>0?(0,c.jsxs)("span",{className:"dg-chip",children:[t("sum")," ",(0,c.jsx)("b",{children:ze.sum.toFixed(2)})]}):null,ze.count>0?(0,c.jsxs)("span",{className:"dg-chip",children:[t("avg")," ",(0,c.jsx)("b",{children:ze.avg.toFixed(2)})]}):null]}):null,(0,c.jsx)("span",{children:t("pageSize")}),(0,c.jsx)(xe,{value:String(f),onChange:g=>{E(Number(g.target.value)),u(1)},children:Mn.map(g=>(0,c.jsx)("option",{value:String(g),children:g},g))})]}),re?(0,c.jsx)(Ke,{x:re.x,y:re.y,onClose:()=>fe(null),items:[...(w?.columns??[]).map(g=>{let h=!v.includes(g.name);return{label:g.name,icon:h?"check":void 0,onClick:()=>d(y=>y.includes(g.name)?y.filter(b=>b!==g.name):y.concat(g.name))}}),...v.length>0?[{separator:!0},{label:t("showAll"),icon:"columns",onClick:()=>d([])}]:[]]}):null,ve?(0,c.jsx)(Ke,{x:ve.x,y:ve.y,onClose:()=>he(null),items:[{label:t("exportCsv"),onClick:()=>{Qe("csv")}},{label:t("exportJson"),onClick:()=>{Qe("json")}},{label:t("exportInsert"),onClick:()=>{Qe("insert")}},{label:t("exportMarkdown"),onClick:()=>{Qe("markdown")}}]}):null,s?(0,c.jsx)(Ee,{title:`${t("editRow")} \xB7 ${(o-1)*f+s.rowIndex+1}`,width:560,busy:O,onClose:()=>m(null),footer:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(A,{onClick:()=>m(null),children:t("cancel")}),(0,c.jsx)(A,{variant:"primary",disabled:O,onClick:()=>{gn()},children:t("save")})]}),children:(0,c.jsx)("div",{className:"dg-form",children:an.map(g=>{let h=s.draft[g.name]??"",y=b=>m(I=>I&&{...I,draft:{...I.draft,[g.name]:b}});return(0,c.jsx)(oe,{label:`${g.name}${g.primaryKey?" \xB7 PK":""}`,children:zn(g.type)?(0,c.jsx)(Ot,{rows:3,value:h,onChange:b=>y(b.target.value)}):(0,c.jsx)(ne,{value:h,placeholder:g.nullable?t("null"):"",onChange:b=>y(b.target.value)})},g.name)})})}):null]})}function Dn({t,meta:e,error:n,onRefresh:a}){let l=e;return n?(0,c.jsx)(ae,{tone:"error",children:n}):l?(0,c.jsxs)("div",{className:"dg-struct",children:[(0,c.jsxs)("div",{className:"dg-struct-col dg-struct-col-fields",children:[(0,c.jsxs)("div",{className:"dg-struct-head",children:[t("columns"),(0,c.jsx)("span",{className:"dg-badge",children:l.columns.length}),(0,c.jsx)("div",{className:"dg-spacer"}),(0,c.jsx)(te,{icon:"refresh",title:t("refresh"),size:11,onClick:a})]}),(0,c.jsx)("div",{className:"dg-struct-body",style:{padding:0},children:(0,c.jsxs)("table",{className:"dg-grid dg-grid-fixed",style:{width:"100%"},children:[(0,c.jsx)("thead",{children:(0,c.jsxs)("tr",{children:[(0,c.jsx)("th",{style:{width:"30%"},children:t("name")}),(0,c.jsx)("th",{style:{width:"34%"},children:t("type")}),(0,c.jsx)("th",{style:{width:"12%"},children:t("nullable")}),(0,c.jsx)("th",{style:{width:"24%"},children:t("default")})]})}),(0,c.jsx)("tbody",{children:l.columns.map(i=>(0,c.jsxs)("tr",{children:[(0,c.jsx)("td",{children:(0,c.jsxs)("span",{className:"dg-row",children:[i.primaryKey?(0,c.jsx)(M,{name:"key",size:10}):null,(0,c.jsx)("span",{className:"dg-mono dg-truncate",children:i.name})]})}),(0,c.jsx)("td",{className:"dg-mono dg-truncate",title:i.type,children:i.type}),(0,c.jsx)("td",{children:i.nullable?"YES":"NO"}),(0,c.jsx)("td",{className:"dg-mono dg-truncate",title:i.defaultValue??"",children:i.defaultValue===null?"\u2014":String(i.defaultValue)})]},i.name))})]})})]}),(0,c.jsxs)("div",{className:"dg-struct-col dg-struct-col-indexes",children:[(0,c.jsxs)("div",{className:"dg-struct-head",children:[t("indexes"),(0,c.jsx)("span",{className:"dg-badge",children:l.indexes.length})]}),(0,c.jsx)("div",{className:"dg-struct-body",children:l.indexes.length===0?(0,c.jsx)("div",{className:"dg-muted",children:t("noIndexes")}):l.indexes.map(i=>(0,c.jsxs)("div",{className:"dg-idx",children:[i.primary?(0,c.jsx)(M,{name:"key",size:10}):null,(0,c.jsx)("span",{className:"dg-mono",children:i.name}),(0,c.jsx)("span",{className:"dg-tag",children:i.unique?"unique":"index"}),(0,c.jsx)("span",{className:"dg-muted dg-truncate",children:i.columns.join(", ")})]},i.name))})]}),(0,c.jsxs)("div",{className:"dg-struct-col dg-struct-col-ddl",children:[(0,c.jsx)("div",{className:"dg-struct-head",children:t("ddl")}),(0,c.jsx)("div",{className:"dg-struct-body",children:(0,c.jsx)("pre",{className:"dg-pre",children:l.ddl||"\u2014"})})]})]}):(0,c.jsx)("div",{className:"dg-sqlmsg",children:(0,c.jsx)(be,{label:t("loading")})})}function Zt(t,e){return`SELECT * FROM ${Oe(t,e)} LIMIT 100;`}var $e=require("react");var z=require("react/jsx-runtime"),$n={red:"var(--dsw-alias-state-error-primary)",yellow:"var(--dsw-alias-state-warn-primary)",green:"var(--dsw-alias-state-success-primary)"};function en(t){let{store:e,t:n}=t,a=ue(e.connections),l=ue(e.catalog),[i,o]=(0,$e.useState)(""),[u,f]=(0,$e.useState)(()=>new Set),[E,q]=(0,$e.useState)(()=>new Set),[H,k]=(0,$e.useState)(()=>new Set),D=(w,R)=>R(J=>{let p=new Set(J);return p.has(w)?p.delete(w):p.add(w),p}),Q=i.trim().toLowerCase(),P=(0,$e.useMemo)(()=>{let w=new Map;for(let R of a.items){let J=R.group||n("noGroups"),p=w.get(J)??[];p.push(R),w.set(J,p)}return[...w.entries()].sort((R,J)=>R[0].localeCompare(J[0]))},[a.items,n]),B=async w=>{e.connections.select(w.id);let R=e.connections.session(w.id).status;if(R==="open"||R==="opening"){D(w.id,f);return}f(J=>new Set(J).add(w.id)),await e.connections.connect(w.id)},$=async(w,R)=>{t.onSelectDatabase(w,R);let J=`${w.id}|${R.name}`;q(p=>new Set(p).add(J)),await e.catalog.loadRelations(w.id,R.name,R.schemas[0]??"")},N=(w,R,J,p,L)=>(0,z.jsxs)("div",{className:"dg-trow",style:{paddingLeft:L*13+4},title:`${p.name}${p.rows!==null?` \xB7 ${p.rows} rows`:""}`,onClick:()=>t.onOpenTable(w,R,J,p),children:[(0,z.jsx)("span",{className:"dg-twist"}),(0,z.jsx)("span",{className:"dg-ticon",children:(0,z.jsx)(M,{name:p.kind==="view"?"view":"table",size:11})}),(0,z.jsx)("span",{className:"dg-tlabel",children:p.name}),p.rows!==null?(0,z.jsx)("span",{className:"dg-badge",children:p.rows}):null]},`${w.id}|${R.name}|${J}|${p.name}`),K=(w,R)=>{let J=`${w.id}|${R.name}`,p=E.has(J),L=R.schemas.length?R.schemas:[""];return(0,z.jsxs)("div",{children:[(0,z.jsxs)("div",{className:`dg-trow dg-trow-db${t.selectedDatabaseKey===J?" dg-trow-active":""}`,title:R.name,onClick:()=>{$(w,R)},onContextMenu:W=>{W.preventDefault(),t.onDatabaseMenu(W,w,R)},children:[(0,z.jsx)("span",{className:`dg-twist${p?" dg-twist-open":""}`,onClick:W=>{W.stopPropagation(),D(J,q),p||e.catalog.loadRelations(w.id,R.name,L[0]??"")},children:(0,z.jsx)(M,{name:"chevron",size:9})}),(0,z.jsx)("span",{className:"dg-ticon",children:(0,z.jsx)(M,{name:"database",size:11})}),(0,z.jsx)("span",{className:"dg-tlabel",children:R.name}),R.schemas.length>1?(0,z.jsx)("span",{className:"dg-badge",children:R.schemas.length}):null]}),p?L.map(W=>{let U=`${J}|${W}`,ye=!W||H.has(U),pe=l.relations[`${w.id}|${R.name}|${W}`]??[],ee=l.loading[`${w.id}|${R.name}|${W}`]===!0;return(0,z.jsxs)("div",{children:[W?(0,z.jsxs)("div",{className:"dg-trow",style:{paddingLeft:17},onClick:()=>{D(U,k),ye||e.catalog.loadRelations(w.id,R.name,W)},children:[(0,z.jsx)("span",{className:`dg-twist${ye?" dg-twist-open":""}`,children:(0,z.jsx)(M,{name:"chevron",size:9})}),(0,z.jsx)("span",{className:"dg-ticon",children:(0,z.jsx)(M,{name:"folder",size:11})}),(0,z.jsx)("span",{className:"dg-tlabel",children:W})]}):null,ye?ee&&pe.length===0?(0,z.jsx)("div",{className:"dg-muted",style:{padding:`2px 8px 2px ${(W?3:2)*13+16}px`},children:n("loading")}):pe.map(ie=>N(w,R,W,ie,W?3:2)):null]},W||"_default")}):null]},J)};return(0,z.jsxs)("div",{className:"dg-tree",children:[(0,z.jsxs)("div",{className:"dg-panehead",children:[(0,z.jsx)(M,{name:"database",size:11}),n("connections"),(0,z.jsx)("span",{className:"dg-badge",children:a.items.length}),(0,z.jsx)("div",{className:"dg-spacer"}),(0,z.jsx)(te,{icon:"refresh",title:n("refresh"),size:11,onClick:()=>{e.connections.load(),e.meta.load()}}),(0,z.jsx)(te,{icon:"plus",title:n("newConnection"),size:11,onClick:t.onNewConnection})]}),(0,z.jsx)("div",{className:"dg-row",style:{padding:"4px 6px"},children:(0,z.jsxs)("div",{className:"dg-search",children:[(0,z.jsx)(M,{name:"search",size:10}),(0,z.jsx)("input",{value:i,placeholder:n("search"),onChange:w=>o(w.target.value)})]})}),(0,z.jsxs)("div",{className:"dg-tree-scroll",children:[a.loading&&a.items.length===0?(0,z.jsx)("div",{className:"dg-muted",style:{padding:8},children:n("loading")}):null,a.error?(0,z.jsx)("div",{className:"dg-banner dg-banner-error",children:a.error}):null,P.map(([w,R])=>{let J=R.filter(p=>!Q||p.name.toLowerCase().includes(Q)?!0:e.connections.session(p.id).databases.some(W=>W.name.toLowerCase().includes(Q)));return J.length===0?null:(0,z.jsxs)("div",{children:[(0,z.jsxs)("div",{className:"dg-group",children:[(0,z.jsx)("span",{className:"dg-twist"}),(0,z.jsx)("span",{className:"dg-truncate",children:w}),(0,z.jsx)("span",{className:"dg-badge",children:J.length})]}),J.map(p=>{let L=e.connections.session(p.id),W=u.has(p.id)&&L.status==="open";return(0,z.jsxs)("div",{children:[(0,z.jsxs)("div",{className:`dg-trow${a.activeId===p.id?" dg-trow-active":""}`,onClick:()=>{B(p)},onContextMenu:U=>{U.preventDefault(),t.onConnectionMenu(U,p)},title:`${p.name} \xB7 ${p.engine}`,children:[(0,z.jsx)("span",{className:`dg-twist${W?" dg-twist-open":""}`,children:(0,z.jsx)(M,{name:"chevron",size:9})}),p.color!=="none"?(0,z.jsx)("span",{className:"dg-colorbar",style:{background:$n[p.color]}}):null,(0,z.jsx)("span",{className:"dg-ticon",children:(0,z.jsx)(M,{name:"database",size:12})}),(0,z.jsx)("span",{className:"dg-tlabel",children:p.name}),(0,z.jsx)("span",{className:"dg-badge",children:p.engine}),(0,z.jsx)(Kt,{status:L.status})]}),L.status==="opening"?(0,z.jsxs)("div",{className:"dg-muted dg-hint",style:{padding:"2px 8px 2px 30px"},children:[n("connect"),"\u2026"]}):null,L.status==="error"?(0,z.jsx)("div",{className:"dg-muted dg-hint",style:{padding:"2px 8px 2px 30px"},children:L.error||n("error")}):null,W?L.databases.map(U=>K(p,U)):null]},p.id)})]},w)}),!a.loading&&a.items.length===0?(0,z.jsx)("div",{className:"dg-muted dg-hint",style:{padding:10},children:n("selectConnection")}):null]})]})}var S=require("react/jsx-runtime"),Ln=[{id:"tables",labelKey:"tables",icon:"table",target:"relations",relation:"table"},{id:"views",labelKey:"views",icon:"view",target:"relations",relation:"view"},{id:"functions",labelKey:"functions",icon:"function",target:"routines"},{id:"users",labelKey:"users",icon:"user",target:"accounts"},{id:"queries",labelKey:"queries",icon:"bookmark",target:"queries"}];function tn({t}){let e=t??(d=>d),[n]=(0,Ce.useState)(()=>new _e),a=ue(n.connections),l=ue(n.meta),i=ue(n.tabs),[o,u]=(0,Ce.useState)(null),[f,E]=(0,Ce.useState)(null),[q,H]=(0,Ce.useState)(null),[k,D]=(0,Ce.useState)(null),[Q,P]=(0,Ce.useState)(null),[B,$]=(0,Ce.useState)(262);(0,Ce.useEffect)(()=>{n.bootstrap()},[n]),(0,Ce.useEffect)(()=>{if(!Q)return;let d=setTimeout(()=>P(null),3600);return()=>clearTimeout(d)},[Q]);let N=(d,s="info")=>P({message:d,tone:s}),K=d=>a.items.find(s=>s.id===d),w=d=>K(d)?.engine??"sqlite",R=(d,s)=>{let m=s.schemas[0]??"";u({connectionId:d.id,database:s.name,schema:m}),n.catalog.loadRelations(d.id,s.name,m),n.tabs.open({id:`relations:${d.id}:${s.name}:${m}:table`,kind:"relations",connectionId:d.id,database:s.name,schema:m,relation:"table",title:s.name})},J=(d,s)=>{u({connectionId:d.id,database:s.name,schema:s.schemas[0]??""}),n.tabs.open({id:`overview:${d.id}:${s.name}`,kind:"overview",connectionId:d.id,database:s.name,title:s.name})},p=(d,s,m,O)=>{n.tabs.open({id:`table:${d.id}:${s}:${m}:${O.name}`,kind:"table",connectionId:d.id,database:s,schema:m,table:O.name,tableKind:O.kind,title:O.name})},L=(d,s="table")=>{if(d==="queries"){n.tabs.open({id:"queries",kind:"queries",connectionId:"",database:"",schema:"",title:e("queries")});return}if(!o)return N(e("selectDatabase"),"info");if(d==="accounts"){n.tabs.open({id:`accounts:${o.connectionId}`,kind:"accounts",connectionId:o.connectionId,database:o.database,schema:"",title:e("users")});return}if(d==="relations"){n.tabs.open({id:`relations:${o.connectionId}:${o.database}:${o.schema}:${s}`,kind:"relations",connectionId:o.connectionId,database:o.database,schema:o.schema,relation:s,title:o.database});return}n.tabs.open({id:`${d}:${o.connectionId}:${o.database}:${o.schema}`,kind:d,connectionId:o.connectionId,database:o.database,schema:o.schema,title:e(d==="routines"?"functions":"users")})},W=(d,s)=>{let m=d??(o?K(o.connectionId):a.items[0]);if(!m)return E({kind:"connection"});let O=o&&o.connectionId===m.id?o.database:n.connections.session(m.id).databases[0]?.name??"";n.tabs.open({id:`sql:${m.id}:${Date.now()}`,kind:"sql",connectionId:m.id,database:O,title:`${e("query")} ${i.tabs.filter(_=>_.kind==="sql").length+1}`,initialSql:s??""})},U=d=>{let s=K(d.connectionId)??a.items[0];if(!s)return E({kind:"connection"});n.tabs.open({id:`sql:saved:${d.id}:${Date.now()}`,kind:"sql",connectionId:s.id,database:d.database,title:d.name,initialSql:d.sql})},ye=async d=>{let s=f&&f.kind==="connection"?f.initial:void 0;if(s)await n.connections.update(s.id,d),n.tabs.closeConnection(s.id),N(e("saved"),"success");else{let m=await n.connections.create(d);N(m.ok?ce(e("testOk"),{version:m.serverVersion??"",ms:m.latencyMs??0}):e("saved"),m.ok?"success":"info")}E(null)},pe=(d,s)=>{let m=n.connections.session(s.id).status;D({x:d.clientX,y:d.clientY,items:[m==="open"?{label:e("disconnect"),icon:"unplug",onClick:()=>{n.connections.disconnect(s.id)}}:{label:e("connect"),icon:"plug",onClick:()=>{n.connections.connect(s.id)}},{label:e("test"),icon:"check",onClick:()=>{n.connections.test(s.id).then(O=>N(ce(e("testOk"),{version:O.serverVersion??"",ms:O.latencyMs??0}),"success"),O=>N(O instanceof Error?O.message:String(O),"error"))}},{separator:!0},{label:e("newQuery"),icon:"play",onClick:()=>W(s)},{label:e("edit"),icon:"pencil",onClick:()=>E({kind:"connection",initial:s})},{label:e("refresh"),icon:"refresh",onClick:()=>{n.connections.reloadDatabases(s.id)}},{separator:!0},{label:e("delete"),icon:"trash",danger:!0,onClick:()=>H(s)}]})},ee=(d,s,m)=>{D({x:d.clientX,y:d.clientY,items:[{label:e("overview"),icon:"info",onClick:()=>J(s,m)},{label:e("tables"),icon:"table",onClick:()=>{u({connectionId:s.id,database:m.name,schema:m.schemas[0]??""}),L("relations","table")}},{label:e("views"),icon:"view",onClick:()=>{u({connectionId:s.id,database:m.name,schema:m.schemas[0]??""}),L("relations","view")}},{label:e("functions"),icon:"function",onClick:()=>{u({connectionId:s.id,database:m.name,schema:m.schemas[0]??""}),L("routines")}},{separator:!0},{label:e("newQuery"),icon:"play",onClick:()=>W(s)}]})},ie=n.bindings(),we=o?`${o.connectionId}|${o.database}`:"",ve=i.tabs.find(d=>d.id===i.activeId)??null,he=(0,S.jsxs)("div",{className:"dg-toolbar",children:[(0,S.jsxs)("span",{className:"dg-brand",children:[(0,S.jsx)(M,{name:"database",size:15}),e("panel")]}),(0,S.jsxs)("div",{className:"dg-toolgroup",children:[(0,S.jsxs)(A,{onClick:()=>E({kind:"connection"}),title:e("newConnection"),children:[(0,S.jsx)(M,{name:"plus",size:11}),e("newConnection")]}),(0,S.jsxs)(A,{onClick:()=>W(),title:e("newQuery"),children:[(0,S.jsx)(M,{name:"play",size:10}),e("newQuery")]})]}),(0,S.jsx)("span",{className:"dg-toolbar-divider"}),(0,S.jsx)("div",{className:"dg-toolgroup",children:Ln.map(d=>(0,S.jsxs)(A,{size:"sm",variant:"ghost",onClick:()=>L(d.target,d.relation),title:e(d.labelKey),children:[(0,S.jsx)(M,{name:d.icon,size:11}),e(d.labelKey)]},d.id))}),(0,S.jsx)("div",{className:"dg-spacer"}),l.meta?.allowWrites?(0,S.jsx)("span",{className:"dg-chip",title:e("writesEnabled"),children:e("writesEnabled")}):(0,S.jsx)("span",{className:"dg-chip",title:e("readOnlyForAgent"),children:e("readOnlyForAgent")}),(0,S.jsxs)(A,{size:"sm",variant:"ghost",onClick:()=>E({kind:"workspaces"}),title:e("workspaces"),children:[(0,S.jsx)(M,{name:"link",size:10}),e("workspaces"),ie.length>0?` \xB7 ${ie.length}`:""]}),(0,S.jsx)(te,{icon:"refresh",title:e("refresh"),onClick:()=>{n.connections.load(),n.meta.load()}})]}),de=i.tabs.length?(0,S.jsx)("div",{className:"dg-tabs",role:"tablist",children:i.tabs.map(d=>(0,S.jsxs)("div",{role:"tab",tabIndex:d.id===i.activeId?0:-1,"aria-selected":d.id===i.activeId,className:`dg-tab${d.id===i.activeId?" dg-tab-active":""}`,onClick:()=>n.tabs.activate(d.id),onKeyDown:s=>{if(s.key==="Enter"||s.key===" "){s.preventDefault(),n.tabs.activate(d.id);return}let m=s.key==="ArrowRight"?1:s.key==="ArrowLeft"?-1:0;if(m===0)return;s.preventDefault();let O=s.currentTarget.parentElement?.children,_=O?.length??0;if(!_)return;let re=i.tabs[(i.tabs.findIndex(fe=>fe.id===d.id)+m+_)%_];re&&(n.tabs.activate(re.id),O?.[i.tabs.indexOf(re)]?.focus())},title:d.title,children:[(0,S.jsx)(M,{name:d.kind==="table"?d.tableKind==="view"?"view":"table":d.kind==="sql"?"play":d.kind==="queries"?"bookmark":d.kind==="redis"?"database":"info",size:10}),(0,S.jsx)("span",{className:"dg-tab-label",children:d.title}),(0,S.jsx)("button",{type:"button",className:"dg-tab-close","aria-label":`${e("close")} ${d.title}`,onClick:s=>{s.stopPropagation(),n.tabs.close(d.id)},children:(0,S.jsx)(M,{name:"x",size:9})})]},d.id))}):null,Se=i.tabs.map(d=>{if(d.id!==i.activeId)return null;let s=K(d.connectionId);switch(d.kind){case"overview":{let m=n.connections.session(d.connectionId).databases.find(O=>O.name===d.database);return m?(0,S.jsx)(Wt,{t:e,store:n,connectionId:d.connectionId,database:m,schemas:m.schemas,onOpenRelations:O=>L("relations",O)},d.id):null}case"table":return(0,S.jsx)(Yt,{t:e,tab:d,engine:w(d.connectionId),notify:N},d.id);case"sql":return(0,S.jsx)(Gt,{t:e,tab:d,tables:n.catalog.relationsOf(`${d.connectionId}|${d.database}|`).map(m=>m.name),notify:N,onSaved:()=>{n.queries.load()}},d.id);case"relations":return(0,S.jsx)(Qt,{t:e,store:n,connectionId:d.connectionId,database:d.database,schema:d.schema,kind:d.relation,onOpen:m=>{s&&p(s,d.database,d.schema,m)},onQuery:m=>W(s,Zt(w(d.connectionId),m.name)),notify:N},d.id);case"routines":return(0,S.jsx)(Jt,{t:e,store:n,connectionId:d.connectionId,database:d.database,schema:d.schema},d.id);case"accounts":return(0,S.jsx)(Ut,{t:e,store:n,connectionId:d.connectionId},d.id);case"queries":return(0,S.jsx)(_t,{t:e,store:n,onOpen:U,notify:N},d.id);case"redis":return(0,S.jsx)(Xt,{t:e,tab:d,notify:N},d.id);default:return null}}),v=(0,S.jsxs)("div",{className:"dg-status",children:[a.activeId?(0,S.jsxs)("span",{className:"dg-status-item",children:[(0,S.jsx)(M,{name:"database",size:10}),(0,S.jsx)("b",{children:K(a.activeId)?.name??""}),(0,S.jsx)("span",{children:n.connections.session(a.activeId).version||K(a.activeId)?.engine||""})]}):(0,S.jsx)("span",{className:"dg-status-item",children:e("selectConnection")}),o?(0,S.jsxs)("span",{className:"dg-status-item",children:[(0,S.jsx)("span",{children:o.database}),o.schema?(0,S.jsxs)("span",{children:["\xB7 ",o.schema]}):null]}):null,(0,S.jsx)("div",{className:"dg-spacer"}),ie.length>0?(0,S.jsxs)("span",{className:"dg-status-item",children:[e("boundProject"),": ",ie.length]}):null,(0,S.jsx)("span",{className:"dg-status-item",children:ve?ve.kind:"ready"})]});return(0,S.jsxs)("div",{className:"dg-root",children:[(0,S.jsx)("style",{children:jt}),he,l.error?(0,S.jsx)(ae,{tone:"error",onClose:()=>{n.meta.load()},children:l.error}):null,(0,S.jsxs)("div",{className:"dg-body",children:[(0,S.jsx)("div",{style:{width:B,flex:`0 0 ${B}px`,display:"flex",minWidth:0},children:(0,S.jsx)(en,{store:n,t:e,onNewConnection:()=>E({kind:"connection"}),selectedDatabaseKey:we,onSelectDatabase:R,onOpenTable:(d,s,m,O)=>p(d,s.name,m,O),onConnectionMenu:pe,onDatabaseMenu:ee})}),(0,S.jsx)(Ft,{width:B,setWidth:$,min:200,max:420}),(0,S.jsxs)("div",{className:"dg-main",children:[de,i.tabs.length===0?(0,S.jsx)(me,{title:e("selectConnection"),hint:e("agentHint"),children:(0,S.jsxs)(A,{variant:"primary",onClick:()=>E({kind:"connection"}),children:[(0,S.jsx)(M,{name:"plus",size:11}),e("newConnection")]})}):null,Se,Q?(0,S.jsxs)("div",{className:`dg-toast${Q.tone==="error"?" dg-toast-error":""}`,children:[(0,S.jsx)(M,{name:Q.tone==="error"?"alert":"check",size:11}),(0,S.jsx)("span",{className:"dg-truncate",children:Q.message})]}):null]})]}),v,f&&f.kind==="connection"?(0,S.jsx)(Vt,{t:e,engines:l.meta?.engines??[],initial:f.initial??null,onClose:()=>E(null),onSave:ye}):null,f&&f.kind==="workspaces"?(0,S.jsx)(Ht,{t:e,store:n,onClose:()=>E(null),notify:N}):null,q?(0,S.jsx)(Ke,{x:window.innerWidth/2,y:window.innerHeight/2,onClose:()=>H(null),items:[{label:e("confirmDeleteConnection"),disabled:!0},{separator:!0},{label:e("cancel"),onClick:()=>H(null)},{label:e("delete"),icon:"trash",danger:!0,onClick:()=>{let d=q;H(null),n.connections.remove(d.id).catch(s=>N(s instanceof Error?s.message:String(s),"error"))}}]}):null,k?(0,S.jsx)(Ke,{x:k.x,y:k.y,items:k.items,onClose:()=>D(null)}):null]})}var Ie=require("react/jsx-runtime"),Ge="grid",nn="grid";function qn({size:t=20,active:e}){return(0,Ie.jsxs)("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none","aria-hidden":!0,focusable:"false",children:[(0,Ie.jsx)("ellipse",{cx:"12",cy:"5.6",rx:"7.1",ry:"2.9",stroke:"currentColor",strokeWidth:1.5}),(0,Ie.jsx)("path",{d:"M4.9 5.6v12.8c0 1.6 3.18 2.9 7.1 2.9s7.1-1.3 7.1-2.9V5.6",stroke:"currentColor",strokeWidth:1.5,strokeLinecap:"round"}),(0,Ie.jsx)("path",{d:"M4.9 9.9c0 1.6 3.18 2.9 7.1 2.9s7.1-1.3 7.1-2.9",stroke:"currentColor",strokeWidth:1.5}),(0,Ie.jsx)("path",{d:"M4.9 14.2c0 1.6 3.18 2.9 7.1 2.9s7.1-1.3 7.1-2.9",stroke:"currentColor",strokeWidth:1.5}),(0,Ie.jsx)("rect",{x:"10.55",y:"9.55",width:"2.9",height:"10.9",rx:"1.2",fill:"var(--dsw-alias-brand-primary)",opacity:e===!1?.55:.9})]})}function An(t){t.effect(()=>t.locale.register(Ge,Nt),"grid: dictionaries");let e=t.locale.bind(Ge);t.slots.inject("main",()=>t.slots.register({name:"main",key:nn,locale:Ge},tn)),t.slots.inject("sidebar.panellist",()=>t.slots.register({name:"sidebar.panellist",id:nn,order:15,label:()=>e("panel"),locale:Ge},qn))}var On={inject:["slots","locale"],apply:An};

    return module.exports.default || module.exports;
  },
});
