package us.avn.oms.service.impl;

import java.io.Reader;
import java.util.Collection;
import java.util.Iterator;

import us.avn.oms.domain.ChildValue;
import us.avn.oms.domain.Tag;
import us.avn.oms.domain.Vertex;
import us.avn.oms.mapper.TagMapper;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;



public class TagServiceTest {

	private static SqlSessionFactory sqlSessionFactory;

	private Long  userId;

	@BeforeAll
	static void setUp() {
		// create an SqlSessionFactory
		try (Reader reader = Resources.getResourceAsReader("config/mybatis-config.xml")) {
			sqlSessionFactory = new SqlSessionFactoryBuilder().build(reader);
		} catch( Exception e ) {
			e.printStackTrace();
		}
	}

	@Test
	void shouldGetAllTagsByType() {
		try (SqlSession sqlSession = sqlSessionFactory.openSession()) {
			TagMapper mapper = sqlSession.getMapper(TagMapper.class);
			Collection<Tag> ct = mapper.getAllTagsByType(Tag.ANALOG_INPUT);
			Assertions.assertNotNull(ct);
			Long noCalculated = new Long(ct.size());
			Assertions.assertNotEquals(0L,noCalculated);
		}
	}
	
	@Test
	void shouldGetATagByName() {
		try (SqlSession sqlSession = sqlSessionFactory.openSession()) {
			TagMapper mapper = sqlSession.getMapper(TagMapper.class);
			Collection<Tag> ct = mapper.getAllTagsByType(Tag.ANALOG_INPUT);
			Assertions.assertNotNull(ct);
			Long noCalculated = new Long(ct.size());
			Assertions.assertNotEquals(0L,noCalculated);
			Iterator<Tag> ict = ct.iterator();
			Tag ai = ict.next();
			Tag tag = mapper.getTagByName(ai.getName(),Tag.ANALOG_INPUT);
			Assertions.assertNotNull(tag);
			userId = tag.getId();
			Assertions.assertEquals(ai.getName(), tag.getName());
		}
	}

	@Test
	void shouldGetATag() {
		try (SqlSession sqlSession = sqlSessionFactory.openSession()) {
			TagMapper mapper = sqlSession.getMapper(TagMapper.class);
			Collection<Tag> ct = mapper.getAllTagsByType(Tag.ANALOG_INPUT);
			Assertions.assertNotNull(ct);
			Long noCalculated = new Long(ct.size());
			Assertions.assertNotEquals(0L,noCalculated);
			Iterator<Tag> ict = ct.iterator();
			Tag ai = ict.next();
			Tag tag = mapper.getTag(ai.getId());
			Assertions.assertNotNull(tag);
			Assertions.assertEquals(ai.getId(), tag.getId());
		}
	}

	@Test
	void shouldGetASchematic() {
		try (SqlSession sqlSession = sqlSessionFactory.openSession()) {
			TagMapper mapper = sqlSession.getMapper(TagMapper.class);
			Collection<Tag> cscm = mapper.getAllTagsByType(Tag.SCHEMATIC);
			Assertions.assertNotNull(cscm);
			Long noCalculated = new Long(cscm.size());
			Assertions.assertNotEquals(0L,noCalculated);
			Iterator<Tag> icscm = cscm.iterator();
			Tag scm = icscm.next();
			Collection<ChildValue> cvScm = mapper.getSCMChildValues(scm.getId());
			Assertions.assertNotNull(cvScm);
			System.out.println(cvScm);
		}
	}


}
